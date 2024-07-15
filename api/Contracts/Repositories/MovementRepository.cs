public interface IMovementRepository{
    public Task<ResultWrapper<Movement>> Movement(int id);
    public Task<ResultWrapper<Movement>> UpdateMovement(Movement inputMovement);
    public Task<bool> DeleteMovement(int id);
    public Task<ResultWrapper<Movement>> CreateMovement(Movement inputMovement);
}