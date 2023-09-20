
namespace harzem_salon.Model;

public class NewTestimonial
{
    public required string fullName { get; set; }
    public required string content { get; set; }
}


public class ServiceCategory_Update
{
    public required string cateCode { get; set; }
    public required List<OurService_Update> OurServices { get; set; }
}


public partial class OurService_Update
{
    public required string serviceName { get; set; }
    public required string serviceCode { get; set; }
    public required List<string> MiniGalleryImages { get; set; }
}

public class NewGalleryImage
{
    public required IFormFile file { get; set; }
    public string? title { get; set; }
}

public class CreateImageModel
{
    public required IFormFile file { get; set; }
    public required string category { get; set; }
}