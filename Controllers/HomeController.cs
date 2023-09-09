using harzem_salon.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace harzem_salon.Controllers;

[ApiController]
[Route("api/content")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;
    private readonly HarzemSalonContext _db;

    public HomeController(ILogger<HomeController> logger, HarzemSalonContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet("testimonials")]
    public async Task<IActionResult> Testimonials()
    {
        var testimonials = await _db.Testimonials.ToListAsync();

        if (testimonials.IsNullOrEmpty())
        {
            return NotFound();
        }
        return Ok(new { testimonials });
    }

    [HttpGet("discount_combinations")]
    public async Task<IActionResult> DiscountCombinations()
    {
        var discountCombinations = await _db.DiscountCombinations.ToListAsync();

        if (discountCombinations.IsNullOrEmpty())
        {
            return NotFound();
        }
        return Ok(new { discountCombinations });
    }

    [HttpGet("home_gallery")]
    public async Task<IActionResult> HomeGallery()
    {
        var gallery = await _db.Galleries
            .OrderByDescending(g => g.uploadDate)
            .Take(10)
            .Select(g => g.imageLink)
            .ToListAsync();

        if (gallery.IsNullOrEmpty())
        {
            return NotFound();
        }
        return Ok(new { gallery });
    }

    [HttpGet("gallery")]
    public async Task<IActionResult> Gallery()
    {
        var gallery = await _db.Galleries
            .OrderByDescending(g => g.uploadDate)
            .ToListAsync();

        if (gallery.IsNullOrEmpty())
        {
            return NotFound();
        }
        return Ok(new { gallery });
    }

    [HttpGet("our_services")]
    public async Task<IActionResult> OurServices()
    {
        var categories = await _db.ServiceCategories
            .Include(category => category.OurServices)
            .Select(sc => new
            {
                sc.cateCode,
                ourServices = sc.OurServices.Select(os => new
                {
                    os.serviceName,
                    os.serviceCode,
                })
            })
            .ToListAsync();

        bool anyOurServicesEmpty = categories.Any(category => category.ourServices.IsNullOrEmpty());

        if (categories.IsNullOrEmpty())
        {
            _logger.LogCritical("Categories are empty!", DateTime.UtcNow.ToLongTimeString());
            return NotFound();
        }
        else if (anyOurServicesEmpty)
        {
            _logger.LogCritical("One or multiple ourServices list is empty!", DateTime.UtcNow.ToLongTimeString());
            return NotFound();
        }
        return Ok(new { categories });
    }

    [HttpGet("mini_gallery")]
    public async Task<IActionResult> MiniGallery([FromQuery] string cateCode)
    {
        var ourServices = await _db.OurServices
                .Include(os => os.MiniGalleryImages)
                .Where(os => os.cate.cateCode == cateCode)
                .Select(os => new
                {
                    os.serviceName,
                    os.serviceCode,
                    miniGalleryImages = os.MiniGalleryImages.Select(mgi => mgi.imageLink)
                })
                .ToListAsync();

        if (ourServices.IsNullOrEmpty())
        {
            return NotFound();
        }
        return Ok(new { ourServices });
    }
}
