using System.ComponentModel.DataAnnotations;

public class Movement{
    [Key]
    public int Id { get; set; }
    public float Value { get; set; } = 0;
    public string Description { get; set; } = string.Empty;
    public float UserShare { get; set; } = 0;
    public DateTime CreatedOn { get; set; }
    public bool Shared { get; set; } = true;
    public Category? Category { get; set; }
    public int CategoryId { get; set; } = 8;


    public User User { get; set; } = new User();
}