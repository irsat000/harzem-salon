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
