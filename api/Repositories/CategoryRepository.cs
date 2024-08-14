using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

public class CategoryRepository : ICategoryRepository
{
    private readonly ExpensesContext _context;

    public CategoryRepository(ExpensesContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> Categories()
    {
        try
        {
            return await _context
                .Categories.ToListAsync();
        }
        catch (System.Exception)
        {
            throw;
        }
    }
}
