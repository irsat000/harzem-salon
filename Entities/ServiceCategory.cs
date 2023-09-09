using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class ServiceCategory
{
    public int id { get; set; }

    public string cateCode { get; set; } = null!;

    public virtual ICollection<OurService> OurServices { get; set; } = new List<OurService>();
}
