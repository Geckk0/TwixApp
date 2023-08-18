using System;
using System.Collections.Generic;

namespace TwixApp.Models;

public partial class Pop
{
    public int Id { get; set; }

    public int Number { get; set; }

    public string Series { get; set; } = null!;

    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public DateTime? DeletedAt { get; set; }

    public int Rating { get; set; }

    public string? ImgUrl { get; set; }

    public virtual User User { get; set; } = null!;
}
