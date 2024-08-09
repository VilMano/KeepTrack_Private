public interface IMutation
{
    public Task<Movement> CreateMovement(
        MovementDTO movement,
        [Service] MovementService service,
        [Service] UserService userService
    );

    public Task<Movement> UpdateMovement(Movement movement, [Service] MovementService service);

    public Task<bool> DeleteMovement(int id, [Service] MovementService service);

    public Task<User> CreateUser(User user, [Service] UserService service);

    public Task<User> UpdateUser(User user, [Service] UserService service);

    public Task<bool> DeleteUser(string id, [Service] UserService service);
}
