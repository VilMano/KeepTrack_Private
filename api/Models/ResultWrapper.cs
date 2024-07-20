public class ResultWrapper<T>{
    public List<string> Errors { get; set; } = [];
    public List<T> Results { get; set; } = [];
    public bool Successful { get; set; } = false;
}