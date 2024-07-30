public interface IUserService{

    public Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model);
    public Task<ResultWrapper<User>> FetchUser(string id);
    public Task<ResultWrapper<User>> UpdateUser(User user);
    public Task<ResultWrapper<bool>> DeleteUser(string id);
    public Task<ResultWrapper<User>> CreateUser(User user);
}