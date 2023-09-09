﻿using harzem_salon.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        return Ok(new { testimonials });
    }

    [HttpGet("discount_combinations")]
    public async Task<IActionResult> DiscountCombinations()
    {
        var discountCombinations = await _db.DiscountCombinations.ToListAsync();
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
        return Ok(new { gallery });
    }

    [HttpGet("gallery")]
    public async Task<IActionResult> Gallery()
    {
        var gallery = await _db.Galleries
            .OrderByDescending(g => g.uploadDate)
            .ToListAsync();
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
        return Ok(new { ourServices });
    }
}
