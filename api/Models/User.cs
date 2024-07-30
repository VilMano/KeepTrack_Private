using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public string Name { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
    
    public List<Movement> Movements {get; set;} = new List<Movement>();
}