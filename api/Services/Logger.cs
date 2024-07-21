
public class Logger : ILogger
{
    private readonly ExpensesContext _con;

    public Logger(ExpensesContext con)
    {
        _con = con;
    }

    public async Task Log(string error, string message)
    {
        try
        {
            ILog log = new ILog();
            log.Error = error;
            log.Message = message;

            await _con.Logs.AddAsync(log);
            await _con.SaveChangesAsync();
            
        }
        catch (System.Exception)
        {
            
            throw;
        }

        return;
    }
}