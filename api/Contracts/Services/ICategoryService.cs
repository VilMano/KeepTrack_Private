public interface ICategoryService{
    public Task<ResultWrapper<Category>> FetchCategories();
    public Task<ResultWrapper<Category>> FetchCategory(int id);
}