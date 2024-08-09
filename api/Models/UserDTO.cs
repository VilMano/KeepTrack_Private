using Microsoft.AspNetCore.Identity;

public class UserDTO
{
    public string Id { get; set; } = string.Empty;
    public string? Name { get; set; } = string.Empty;
    public float? Debt { get; set; } = 0;

    public List<Movement>? Movements {get; set;} = new List<Movement>();
}