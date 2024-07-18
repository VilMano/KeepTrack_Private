public class Movement{
    public int Id { get; set; }
    public float Value { get; set; } = 0;
    public string Description { get; set; } = string.Empty;
    public float UserShare { get; set; } = 0;

    public User User { get; set; } = new User();
}