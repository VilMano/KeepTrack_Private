public class MovementDTO{
    public int Id { get; set; }
    public float Value { get; set; } = 0;
    public string Description { get; set; } = string.Empty;
    public float UserShare { get; set; } = 0;
    public DateTime CreatedOn { get; set; }
    public bool Shared { get; set; } = true;


    public string UserId { get; set; } = string.Empty;
}