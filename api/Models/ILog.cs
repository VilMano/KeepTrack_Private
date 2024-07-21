public class ILog{
    public int Id { get; set; }
    public string Error { get; set; }
    public string Message { get; set;}
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}