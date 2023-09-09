using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class NewComer
{
    public int id { get; set; }

    public string fullName { get; set; } = null!;

    public int customerNO { get; set; }

    public virtual Customer customerNONavigation { get; set; } = null!;
}
