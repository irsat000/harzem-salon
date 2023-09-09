﻿using System;
using System.Collections.Generic;

namespace harzem_salon.Entities;

public partial class DeletedNewComer
{
    public int id { get; set; }

    public string fullName { get; set; } = null!;

    public int customerNO { get; set; }

    public DateTime deletionDate { get; set; }
}
