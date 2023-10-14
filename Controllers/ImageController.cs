using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.FileProviders;

namespace harzem_salon.Controllers;

[ApiController]
[Route("")]
[EnableCors("AllowHarzemSalon")]
public class ImageController : ControllerBase
{
    private readonly IFileProvider _fileProvider;
    public ImageController(IFileProvider fileProvider)
    {
        _fileProvider = fileProvider;
    }

    [HttpGet("i/{category}/{imageName}")]
    [EnableRateLimiting("fixed_serveImage")]
    public IActionResult GetImage(string category, string imageName)
    {
        try
        {
            // Get image from the folder
            var filePath = Path.Combine("images", category, imageName);
            var fileInfo = _fileProvider.GetFileInfo(filePath);
            // Check if file exists in the directory
            if (!fileInfo.Exists)
            {
                return NotFound();
            }
            // Get the mime type of the image, example; image/png
            // Substring removes the '.' (dot) from the extension string
            string mimetype = "image/" + Path.GetExtension(fileInfo.Name)[1..].ToLowerInvariant();
            // Serve image
            var stream = fileInfo.CreateReadStream();
            return File(stream, mimetype);
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal Server Error");
        }
    }
}
