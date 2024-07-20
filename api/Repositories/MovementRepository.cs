using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class MovementRepository : IMovementRepository
{
    private readonly ExpensesContext _context;

    public MovementRepository(ExpensesContext context)
    {
        _context = context;
    }

    public async Task<List<Movement>> Movements(Expression<Func<Movement, bool>> expression)
    {
        try
        {
            var a = await _context.Movements.ToListAsync();
            return await _context
                .Movements.Where(expression)
                .Include(m => m.User)
                .ToListAsync<Movement>();
        }
        catch (System.Exception)
        {
            throw;
        }
    }

    public async Task<Movement> CreateMovement(Movement inputMovement)
    {
        try
        {
            EntityEntry<Movement> newMovement = await _context.Movements.AddAsync(inputMovement);
            await _context.SaveChangesAsync();

            return newMovement.Entity;
        }
        catch (System.Exception)
        {
            throw;
        }
    }

    public async Task<bool> DeleteMovement(Movement movement)
    {
        try
        {
            _context.Movements.Remove(movement);
            await _context.SaveChangesAsync();

            return true;
        }
        catch (System.Exception)
        {
            return false;
            throw;
        }
    }

    public async Task<Movement> Movement(int id)
    {
        try
        {
            return await _context
                .Movements.Where(m => m.Id == id)
                .Include(m => m.User)
                .FirstOrDefaultAsync();
        }
        catch (System.Exception)
        {
            throw;
        }
    }

    public async Task<Movement> UpdateMovement(Movement inputMovement)
    {
        try
        {
            EntityEntry<Movement> updatedUser = _context.Movements.Update(inputMovement);
            await _context.SaveChangesAsync();

            return updatedUser.Entity;
        }
        catch (System.Exception)
        {
            throw;
        }
    }
}
