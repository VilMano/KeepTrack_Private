using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class UserRepository : IUserRepository
{
    private readonly ExpensesContext _context;

    public UserRepository(ExpensesContext context)
    {
        _context = context;
    }

    public async Task<User> CreateUser(User inputUser)
    {
        try
        {
            EntityEntry<User> newUser = await _context.Users.AddAsync(inputUser);
            await _context.SaveChangesAsync();

            return newUser.Entity;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return null;
        }

    }

    public async Task<bool> DeleteUser(User user)
    {
        try
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return true;
        }
        catch (System.Exception)
        {
            return false;
            throw;
        }
    }

    public async Task<User> UpdateUser(User inputUser)
    {
        try
        {
            EntityEntry<User> updatedUser = _context.Users.Update(inputUser);
            await _context.SaveChangesAsync();

            return updatedUser.Entity;
        }
        catch (System.Exception)
        {
            return null;
            throw;
        }
    }

    public async Task<User> User(int id)
    {
        try
        {
            return await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        }
        catch (System.Exception)
        {
            
            throw;
        }
    }
}
