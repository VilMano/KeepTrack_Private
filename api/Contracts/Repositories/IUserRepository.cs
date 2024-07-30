using System.Linq.Expressions;

public interface IUserRepository{
    public Task<User> User(string id);
    public Task<List<User>> Users(Expression<Func<User, bool>> expression);
    public Task<User> UpdateUser(User inputUser);
    public Task<bool> DeleteUser(User user);
    public Task<User> CreateUser(User inputUser);
}