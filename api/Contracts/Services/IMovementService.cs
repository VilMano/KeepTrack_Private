public interface IMovementService{
    public Task<ResultWrapper<Debt?>> GetMonthlyDebtsByUser(int month);
    public Task<ResultWrapper<UserDTO?>> GetMonthlyMovementsByUser(int month);


    public Task<ResultWrapper<Movement>> FetchMovement(int id);
    public Task<ResultWrapper<Movement>> UpdateMovement(Movement inputMovement);
    public Task<ResultWrapper<bool>> DeleteMovement(int id);
    public Task<ResultWrapper<Movement>> CreateMovement(Movement inputMovement);
}