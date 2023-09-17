using harzem_salon.Entities;
using harzem_salon.Model;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace harzem_salon.Controllers;

[ApiController]
[Route("cms")]
public class CMSController : ControllerBase
{
    private readonly ILogger<CMSController> _logger;
    private readonly HarzemSalonContext _db;

    public CMSController(ILogger<CMSController> logger, HarzemSalonContext db)
    {
        _logger = logger;
        _db = db;
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
            await _db.SaveChangesAsync();
            return Ok(new { message = "Success" });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "Error" });
        }
    }
}
