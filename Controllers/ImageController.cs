using harzem_salon.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace harzem_salon.Controllers;

[ApiController]
[Route("")]
public class ImageController : ControllerBase
{
    private readonly IFileProvider _fileProvider;
    public ImageController(IFileProvider fileProvider)
    {
        _fileProvider = fileProvider;
    }

    [HttpGet("i/{category}/{imageName}")]
    public IActionResult GetImage(string category, string imageName)
    {
        try
        {
            // Get image from the folder
            var fileInfo = _fileProvider.GetFileInfo($"images/{category}/{imageName}");
            // Check if file exists in the directory
            if (!fileInfo.Exists)
            {
                return NotFound();
            }
            // Get the mime type of the image, example; image/png
            // Substring removes the '.' (dot) from the extension string
            string mimetype = "image/" + Path.GetExtension(fileInfo.Name).Substring(1).ToLowerInvariant();
            // Serve image
            var stream = fileInfo.CreateReadStream();
            return File(stream, mimetype);
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost("cms/upload-image")]
    public async Task<IActionResult> UploadImage([FromForm] UploadImageModel model)
    {
        try
        {
            if (model.file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Check if the uploaded file is an image
            if (!model.file.ContentType.StartsWith("image/"))
            {
                return BadRequest("Invalid file type. Only image files are allowed.");
            }

            // Choose folder path using category
            string folder = model.category == "mini_gallery" ? "images/mini_gallery/" : "images/gallery/";

            // Generate a unique file name to prevent overwriting existing files
            var uniqueFileName = $"{Guid.NewGuid()}_{model.file.FileName}";

            // Define the directory path
            var uploadPath = Path.Combine(folder, uniqueFileName);

            // Save the file to the server
            using (var stream = new FileStream(uploadPath, FileMode.Create))
            {
                await model.file.CopyToAsync(stream);
            }

            return Ok(new { message = "Success!" });
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }
}
