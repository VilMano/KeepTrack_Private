public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<ResultWrapper<Category>> FetchCategories()
    {
        ResultWrapper<Category> result = new ResultWrapper<Category>();
        try
        {
            List<Category> categories = await _repository.Categories();
            result.Results = categories;
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<Category>> FetchCategory(int id)
    {
        ResultWrapper<Category> result = new ResultWrapper<Category>();
        try
        {
            Category category = await _repository.Category(id);
            result.Results.Add(category);
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
