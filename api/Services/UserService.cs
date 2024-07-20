

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }
    public async Task<ResultWrapper<User>> CreateUser(User inputUser)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            User user = await _repository.CreateUser(inputUser);
            result.Results.Add(user);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<bool>> DeleteUser(int id)
    {
        ResultWrapper<bool> result = new ResultWrapper<bool>();

        try
        {
            User userToDelete = await _repository.User(id);

            if(userToDelete != null){
                bool res = await _repository.DeleteUser(userToDelete);
                result.Successful = res;
            }

            result.Errors.Add("User to delete was not found.");
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<User>> FetchUser(int id)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            User user = await _repository.User(id);
            result.Results.Add(user);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<User>> UpdateUser(User inputUser)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            User user = await _repository.UpdateUser(inputUser);
            result.Results.Add(user);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }
}