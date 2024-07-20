using System.Linq.Expressions;

public interface IMovementRepository{
    public Task<List<Movement>> Movements(Expression<Func<Movement, bool>> expression);
    public Task<Movement> Movement(int id);
    public Task<Movement> UpdateMovement(Movement inputMovement);
    public Task<bool> DeleteMovement(Movement movement);
    public Task<Movement> CreateMovement(Movement inputMovement);
}