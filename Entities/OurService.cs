using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class OurService
{
    public int id { get; set; }

    public string serviceName { get; set; } = null!;

    public string serviceCode { get; set; } = null!;

    public int cateId { get; set; }

    public virtual ICollection<MiniGalleryImage> MiniGalleryImages { get; set; } = new List<MiniGalleryImage>();

    public virtual ServiceCategory cate { get; set; } = null!;
}
