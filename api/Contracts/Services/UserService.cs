public interface IUserService{
    public Task<ResultWrapper<User>> FetchUser(int id);
    public Task<ResultWrapper<User>> UpdateUser(int id);
    public Task<bool> DeleteUser(int id);
    public Task<ResultWrapper<User>> CreateUser(int id);
}