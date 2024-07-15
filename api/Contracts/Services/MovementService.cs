public interface IMovementService{
    public Task<ResultWrapper<Movement>> FetchMovement(int id);
    public Task<ResultWrapper<Movement>> UpdateMovement(Movement inputMovement);
    public Task<bool> DeleteMovement(int id);
    public Task<ResultWrapper<Movement>> CreateMovement(Movement inputMovement);
}