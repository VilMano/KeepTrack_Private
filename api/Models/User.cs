using Microsoft.AspNetCore.Identity;

public class User :IdentityUser
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    
    public List<Movement> Movements {get; set;} = new List<Movement>();
}