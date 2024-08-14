using System.Linq.Expressions;

public interface ICategoryRepository{
    public Task<List<Category>> Categories();
}