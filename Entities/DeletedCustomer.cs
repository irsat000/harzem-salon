using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class DeletedCustomer
{
    public int id { get; set; }

    public int customerNO { get; set; }

    public string pinCode { get; set; } = null!;

    public string fullName { get; set; } = null!;

    public decimal balance { get; set; }

    public DateTime deletionDate { get; set; }
}
