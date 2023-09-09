using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class Gallery
{
    public int id { get; set; }

    public string imageLink { get; set; } = null!;

    public string title { get; set; } = null!;

    public DateTime uploadDate { get; set; }
}
