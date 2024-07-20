public interface IUserRepository{
    public Task<User> User(int id);
    public Task<User> UpdateUser(User inputUser);
    public Task<bool> DeleteUser(User user);
    public Task<User> CreateUser(User inputUser);
}