using System;
using System.Collections.Generic;

namespace TwixApp.Models;

public partial class User
{
    public int Id { get; set; }

    public string Password { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Pop> Pops { get; set; } = new List<Pop>();
}
