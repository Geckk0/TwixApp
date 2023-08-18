using System;
using System.Collections.Generic;

namespace TwixApp.Models;

public partial class PopEdition
{
    public int EditionsId { get; set; }

    public int PopId { get; set; }

    public virtual Edition Editions { get; set; } = null!;

    public virtual Pop Pop { get; set; } = null!;
}
