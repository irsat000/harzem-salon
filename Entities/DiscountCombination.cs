using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class DiscountCombination
{
    public int id { get; set; }

    public string combination { get; set; } = null!;
}
