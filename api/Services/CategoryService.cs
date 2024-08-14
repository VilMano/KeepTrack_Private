public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<ResultWrapper<Category>> FetchCategory()
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
}
