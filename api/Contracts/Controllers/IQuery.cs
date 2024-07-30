public interface IQuery
{
    /// <summary>
    /// Gets a movement by id
    /// </summary>
    /// <param name="id">Id of the requested movement</param>
    /// <returns>Task<User></returns>
    public Task<Movement> GetMovement(int id, [Service] MovementService service);

    /// <summary>
    /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
    /// </summary>
    /// <param name="month">Input from 0 - 11</param>
    /// <returns>Task<List<Movement>></returns>
    public Task<List<Debt>> GetMonthlyDebtByUser(int month, [Service] MovementService service);

    /// <summary>
    /// Gets a user by id
    /// </summary>
    /// <param name="id">Id of the requested user</param>
    /// <returns>Task<User></returns>
    public Task<User> GetUser(string id, [Service] UserService service);
}
