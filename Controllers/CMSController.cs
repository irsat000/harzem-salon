using harzem_salon.Entities;
using harzem_salon.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.RateLimiting;

namespace harzem_salon.Controllers;

[ApiController]
[Route("cms")]
[EnableRateLimiting("fixed_default")]
public class CMSController : ControllerBase
{
    private readonly ILogger<CMSController> _logger;
    private readonly sitelerguzellikdbContext _db;
    private readonly IFileProvider _fileProvider;
    private readonly IConfiguration _config;
    private readonly IWebHostEnvironment _hostingEnvironment;

    public CMSController(
        ILogger<CMSController> logger,
        sitelerguzellikdbContext db,
        IFileProvider fileProvider,
        IConfiguration config,
        IWebHostEnvironment hostingEnvironment
        )
    {
        _logger = logger;
        _db = db;
        _fileProvider = fileProvider;
        _config = config;
        _hostingEnvironment = hostingEnvironment;
    }


    /* Check project path
    [HttpGet("test-root")]
    public IActionResult TestRoot()
    {
        string rootPath = _hostingEnvironment.ContentRootPath;

        return Ok(new { message = "Success", rootPath });
    }
    */

    [HttpPost("admin-login")]
    [EnableRateLimiting("fixed_cmsLogin")]
    public async Task<IActionResult> AdminLogin([FromBody] AdminLoginCreds creds)
    {
        try
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(creds.adminName) || string.IsNullOrWhiteSpace(creds.adminPassword))
            {
                return BadRequest("Invalid input data.");
            }

            // Check user
            var checkUser = await _db.Admins.AsNoTracking().Where(u => u.adminName == creds.adminName)
                    .FirstOrDefaultAsync();
            if (checkUser == null || checkUser.adminPassword != creds.adminPassword)
            {
                return NotFound("User not found");
            }

            // Login
            AdminClaims adminClaims = new()
            {
                id = checkUser.id,
                adminName = checkUser.adminName
            };
            var JWT = GenerateJWT(adminClaims);
            if (JWT == null)
            {
                return StatusCode(500, "Internal server error while generating JWT.");
            }

            return Ok(new { message = "Admin login is successful", token = JWT });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error" });
        }
    }

    private string? GenerateJWT(AdminClaims admin)
    {
        try
        {
            // Get secret
            string? jwtSecret = _config["HarzemSalon:JwtSecret"];
            if (string.IsNullOrWhiteSpace(jwtSecret))
            {
                return null;
            }

            // Get Jwt secret
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)); //Encoding.ASCII.GetBytes();

            // Create claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, admin.id.ToString()), // Admin Id
                new Claim(ClaimTypes.Name, admin.adminName), // Admin name
                new Claim(ClaimTypes.Role, "admin")
            };

            // Token creation
            JwtSecurityTokenHandler tokenHandler = new();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(3),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                Issuer = "HarzemSalonApi",
                Audience = "HarzemSalon"
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        catch (Exception)
        {
            return null;
        }
    }

    private async Task<bool> CheckAdmin(ClaimsPrincipal user)
    {
        try
        {
            var adminId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var adminRole = User.FindFirst(ClaimTypes.Role)!.Value;
            if (string.IsNullOrEmpty(adminId) || string.IsNullOrEmpty(adminRole) || adminRole != "admin")
            {
                return false;
            }
            return await _db.Admins.AnyAsync(a => a.id == Convert.ToInt32(adminId));
        }
        catch (Exception)
        {
            return false;
        }
    }

    [Authorize]
    [HttpPost("update-testimonials")]
    public async Task<IActionResult> UpdateTestimonials([FromBody] NewTestimonial[] newTestimonials)
    {
        if (!await CheckAdmin(User))
            return Unauthorized("No authority");

        // Note: Can be empty array, it's okay

        // Remove all existing testimonials
        _db.Testimonials.RemoveRange(_db.Testimonials);

        // Add new testimonials without the 'id' property
        var refinedTestimonials = newTestimonials.Select(testimonial => new Testimonial
        {
            fullName = testimonial.fullName,
            content = testimonial.content
        });
        _db.Testimonials.AddRange(refinedTestimonials);

        try
        {
            await _db.SaveChangesAsync();
            return Ok(new { message = "Success" });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error" });
        }
    }

    [Authorize]
    [HttpPost("update-discount_combinations")]
    public async Task<IActionResult> UpdateDiscountCombinations([FromBody] string[] newCombos)
    {
        if (!await CheckAdmin(User))
            return Unauthorized("No authority");

        // Note: Can be empty array, it's okay

        // Remove all existing combinations
        _db.DiscountCombinations.RemoveRange(_db.DiscountCombinations);

        // Add new combinations without the 'id' property
        var refinedCombos = newCombos.Select(combo => new DiscountCombination
        {
            combination = combo
        });
        _db.DiscountCombinations.AddRange(refinedCombos);

        try
        {
            await _db.SaveChangesAsync();
            return Ok(new { message = "Success" });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error" });
        }
    }

    [Authorize]
    [HttpPost("update-our_services")]
    public async Task<IActionResult> UpdateOurServices([FromBody] ServiceCategory_Update[] newOurServices)
    {
        if (!await CheckAdmin(User))
            return Unauthorized("No authority");

        // Note: Can be empty array, it's okay

        // Remove all existing categories, services and mini gallery
        _db.MiniGalleryImages.RemoveRange(_db.MiniGalleryImages);
        _db.OurServices.RemoveRange(_db.OurServices);

        // Populate the categories with new OurServices
        foreach (ServiceCategory_Update cate in newOurServices)
        {
            var category = await _db.ServiceCategories.FirstOrDefaultAsync(c => c.cateCode == cate.cateCode);
            if (category == null)
            {
                continue;
            }

            category.OurServices = cate.OurServices.Select(service => new OurService
            {
                serviceName = service.serviceName,
                serviceCode = service.serviceCode,
                MiniGalleryImages = service.MiniGalleryImages.Select(img => new MiniGalleryImage
                {
                    imageLink = img
                }).ToList()
            }).ToList();
        }

        try
        {
            // Update database and then manage files
            await _db.SaveChangesAsync();

            // Get image names of the updated our services as a string array
            string[] newImageLinks = newOurServices
                .SelectMany(cate => cate.OurServices
                    .SelectMany(service => service.MiniGalleryImages
                        .Select(img => img))).ToArray();

            // Remove images that doesn't exist in the updated our services
            string[] allExistingFiles = Directory.GetFiles(Path.Combine("images", "mini_gallery"))
                .Select(fullPath => Path.GetFileName(fullPath)).ToArray();
            foreach (string fileName in allExistingFiles)
            {
                if (!newImageLinks.Contains(fileName))
                {
                    RemoveImage(fileName, "mini_gallery");
                    // TODO: Logging if it returns false
                }
            }
            return Ok(new { message = "Success" });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error" });
        }
    }

    [Authorize]
    [HttpPost("upload-image-mini_gallery")]
    public async Task<IActionResult> UploadImage_MiniGallery([FromForm] IFormFile file)
    {
        if (!await CheckAdmin(User))
            return Unauthorized("No authority");

        try
        {
            // Will return the name of the created file or null
            string? createdName = await CreateImage(file, "mini_gallery");
            if (createdName == null)
            {
                return BadRequest("Error when uploading image.");
            }

            // Return the necessary properties for updating the current mini gallery-
            // inside front end with unshift and useState
            return Ok(new
            {
                createdName,
                message = "Success!"
            });
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }

    [Authorize]
    [HttpPost("upload-image-gallery")]
    public async Task<IActionResult> UploadImage_Gallery([FromForm] NewGalleryImage model)
    {
        if (!await CheckAdmin(User))
            return Unauthorized("No authority");

        try
        {
            // Will return the name of the created file or null
            string? createdName = await CreateImage(model.file, "gallery");
            if (createdName == null)
            {
                return BadRequest("Error when uploading image.");
            }

            // Create gallery record for the image and save it to database
            Gallery newImage = new()
            {
                imageLink = createdName,
                title = model.title ?? null,
                uploadDate = DateTime.UtcNow
            };
            await _db.Galleries.AddAsync(newImage);
            await _db.SaveChangesAsync();

            // Return the necessary properties for updating the current gallery-
            // inside front end with unshift and useState
            return Ok(new
            {
                created = new
                {
                    newImage.id,
                    name = createdName,
                    date = newImage.uploadDate
                },
                message = "Success!"
            });
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }

    [Authorize]
    [HttpPost("delete-image-gallery")]
    public async Task<IActionResult> DeleteImage_Gallery([FromBody] int id)
    {
        if (!await CheckAdmin(User))
            return Unauthorized("No authority");

        try
        {
            // Get the record that will be deleted by id
            var willBeDeleted = await _db.Galleries.FirstOrDefaultAsync(img => img.id == id);
            if (willBeDeleted == null)
            {
                return NotFound("Record not found.");
            }
            // Remove from database
            _db.Galleries.Remove(willBeDeleted);
            await _db.SaveChangesAsync();
            // Remove image
            bool imgIsRemoved = RemoveImage(willBeDeleted.imageLink, "gallery");
            if (!imgIsRemoved)
            {
                // Maybe logging later
                return Accepted(new { message = "Record is deleted but file is not." });
            }
            // Response
            return Ok(new { message = "Success!" });
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }


    private bool RemoveImage(string imageName, string category)
    {
        try
        {
            // Get image from the folder
            var filePath = Path.Combine("images", category, imageName);
            var fileInfo = _fileProvider.GetFileInfo(filePath);
            // Check if the file exists
            if (!fileInfo.Exists)
            {
                return false;
            }
            // Delete the file
            System.IO.File.Delete(filePath);
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    private async Task<string?> CreateImage(IFormFile file, string category)
    {
        try
        {
            if (file.Length == 0)
            {
                return null;
            }

            // Check if the uploaded file is an image
            if (!file.ContentType.StartsWith("image/"))
            {
                return null;
            }

            // Get root path
            string rootPath = _hostingEnvironment.ContentRootPath;

            // Choose folder path using category
            string folder = category == "mini_gallery" ? "mini_gallery" : "gallery";

            // Generate a unique file name to prevent overwriting existing files
            var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";

            // Define the directory path
            var uploadPath = Path.Combine(rootPath, "images", folder, uniqueFileName);

            // Save the file to the server
            using (var stream = new FileStream(uploadPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return uniqueFileName;
        }
        catch (Exception)
        {
            return null;
        }
    }
}
