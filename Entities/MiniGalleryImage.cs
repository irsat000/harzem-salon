using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class MiniGalleryImage
{
    public int id { get; set; }

    public string imageLink { get; set; } = null!;

    public int serviceId { get; set; }

    public virtual OurService service { get; set; } = null!;
}
