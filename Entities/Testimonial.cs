using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class Testimonial
{
    public int id { get; set; }

    public string fullName { get; set; } = null!;

    public string content { get; set; } = null!;
}
