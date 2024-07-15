public interface IUserRepository{
    public Task<ResultWrapper<User>> User(int id);
    public Task<ResultWrapper<User>> UpdateUser(User inputUser);
    public Task<bool> DeleteUser(int id);
    public Task<ResultWrapper<User>> CreateUser(User inputUser);
}