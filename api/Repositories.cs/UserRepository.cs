

public class UserRepository : IUserRepository
{
    public Task<ResultWrapper<User>> CreateUser(User inputUser)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteUser(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ResultWrapper<User>> UpdateUser(User inputUser)
    {
        throw new NotImplementedException();
    }

    public Task<ResultWrapper<User>> User(int id)
    {
        throw new NotImplementedException();
    }
}