public class ResultWrapper<T>{
    public List<string> Errors { get; set; } = [];
    public List<T> Results { get; set; } = [];
    public void AddResults(List<T> objs){
        foreach(T obj in objs)
            this.Results.Add(obj);
    }

    public void AddErrors(List<string> errors){
        foreach(string error in errors)
            this.Errors.Add(error);
    }
}