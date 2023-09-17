
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