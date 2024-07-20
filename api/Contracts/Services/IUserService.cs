public interface IUserService{
    public Task<ResultWrapper<User>> FetchUser(int id);
    public Task<ResultWrapper<User>> UpdateUser(User user);
    public Task<ResultWrapper<bool>> DeleteUser(int id);
    public Task<ResultWrapper<User>> CreateUser(User user);
}