public interface IQuery
{
    /// <summary>
    /// Gets a movement by id
    /// </summary>
    /// <param name="id">Id of the requested movement</param>
    /// <returns>Task<User></returns>
    public Task<Movement> GetMovement(int id);

    /// <summary>
    /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
    /// </summary>
    /// <param name="month">Input from 0 - 11</param>
    /// <returns>Task<List<Movement>></returns>
    public Task<List<Movement>> GetThisMonthMovements(int month);

    /// <summary>
    /// Gets a user by id
    /// </summary>
    /// <param name="id">Id of the requested user</param>
    /// <returns>Task<User></returns>
    public Task<User> GetUser(int id);
}
