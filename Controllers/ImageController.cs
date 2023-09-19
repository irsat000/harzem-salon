using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace harzem_salon.Controllers;

[ApiController]
[Route("i")]
public class ImageController : ControllerBase
{
    private readonly IFileProvider _fileProvider;
    public ImageController(IFileProvider fileProvider)
    {
        _fileProvider = fileProvider;
    }

    [HttpGet("{category}/{imageName}")]
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
        catch (System.Exception)
        {
            throw;
        }
    }
}
