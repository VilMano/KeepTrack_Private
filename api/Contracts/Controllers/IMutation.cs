public interface IMutation
{
    public Task<Movement> CreateMovement(Movement movement);

    public Task<Movement> UpdateMovement(Movement movement);

    public Task<bool> DeleteMovement(int id);

    public Task<User> CreateUser(User user);

    public Task<User> UpdateUser(User user);

    public Task<bool> DeleteUser(int id);
}
