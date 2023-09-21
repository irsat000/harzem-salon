using harzem_salon.Entities;
using harzem_salon.Model;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

namespace harzem_salon.Controllers;

[ApiController]
[Route("cms")]
public class CMSController : ControllerBase
{
    private readonly ILogger<CMSController> _logger;
    private readonly HarzemSalonContext _db;
    private readonly IFileProvider _fileProvider;

    public CMSController(ILogger<CMSController> logger, HarzemSalonContext db, IFileProvider fileProvider)
    {
        _logger = logger;
        _db = db;
        _fileProvider = fileProvider;
    }

    [HttpPost("update-testimonials")]
    public async Task<IActionResult> UpdateTestimonials([FromBody] NewTestimonial[] newTestimonials)
    {
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

    [HttpPost("update-discount_combinations")]
    public async Task<IActionResult> UpdateDiscountCombinations([FromBody] string[] newCombos)
    {
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

    [HttpPost("update-our_services")]
    public async Task<IActionResult> UpdateOurServices([FromBody] ServiceCategory_Update[] newOurServices)
    {
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
            string[] allExistingFiles = Directory.GetFiles(Path.Combine("images", "mini_gallery"));
            foreach (string fileName in allExistingFiles)
            {
                if (!newImageLinks.Contains(fileName))
                {
                    RemoveImage(fileName, "mini_gallery");
                    // TODO: Logging if it return false
                }
            }
            return Ok(new { message = "Success" });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error" });
        }
    }


    [HttpPost("upload-image-mini_gallery")]
    public async Task<IActionResult> UploadImage_MiniGallery([FromForm] IFormFile file)
    {
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

    [HttpPost("upload-image-gallery")]
    public async Task<IActionResult> UploadImage_Gallery([FromForm] NewGalleryImage model)
    {
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

    [HttpPost("delete-image-gallery")]
    public async Task<IActionResult> DeleteImage_Gallery([FromBody] int id)
    {
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


    public bool RemoveImage(string imageName, string category)
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

    public async Task<string?> CreateImage(IFormFile file, string category)
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

            // Choose folder path using category
            string folder = category == "mini_gallery" ? "mini_gallery" : "gallery";

            // Generate a unique file name to prevent overwriting existing files
            var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";

            // Define the directory path
            var uploadPath = Path.Combine("images", folder, uniqueFileName);

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
