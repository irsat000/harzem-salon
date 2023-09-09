using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class Admin
{
    public int id { get; set; }

    public string adminName { get; set; } = null!;

    public string adminPassword { get; set; } = null!;
}
