

public class MovementRepository : IMovementRepository
{
    public Task<ResultWrapper<Movement>> CreateMovement(Movement inputMovement)
    {
        throw new NotImplementedException();
    }

    public Task<bool> DeleteMovement(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ResultWrapper<Movement>> Movement(int id)
    {
        throw new NotImplementedException();
    }

    public Task<ResultWrapper<Movement>> UpdateMovement(Movement inputMovement)
    {
        throw new NotImplementedException();
    }
}