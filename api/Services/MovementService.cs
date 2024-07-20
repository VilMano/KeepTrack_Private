using System.Data.Common;
using SQLitePCL;

public class MovementService : IMovementService
{
    private readonly IMovementRepository _repository;
    private readonly IUserRepository _userRepository;

    public MovementService(IMovementRepository repository, IUserRepository userRepository)
    {
        _repository = repository;
        _userRepository = userRepository;
    }

    public async Task<ResultWrapper<Movement>> CreateMovement(Movement inputMovement)
    {
        ResultWrapper<Movement> result = new ResultWrapper<Movement>();
        try
        {
            User creator = await _userRepository.User(inputMovement.User.Id);
            inputMovement.User = creator;

            Movement createdMovement = await _repository.CreateMovement(inputMovement);
            result.Results.Add(createdMovement);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<bool>> DeleteMovement(int id)
    {
        ResultWrapper<bool> result = new ResultWrapper<bool>();

        try
        {
            Movement movementToDelete = await _repository.Movement(id);

            bool deleted = await _repository.DeleteMovement(movementToDelete);

            if (deleted)
                result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<Movement>> FetchMovement(int id)
    {
        ResultWrapper<Movement> result = new ResultWrapper<Movement>();

        try
        {
            Movement movement = await _repository.Movement(id);
            result.Results.Add(movement);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<Debt>> GetTotalByUser(int month)
    {
        ResultWrapper<Debt> result = new ResultWrapper<Debt>();
        try
        {
            var movementsAll = await _repository.Movements(m =>
                m.CreatedOn.Year == DateTime.UtcNow.Year
            );
            var movements = await _repository.Movements(m =>
                m.CreatedOn.Month == month && m.CreatedOn.Year == DateTime.UtcNow.Year
            );

            string username1 = "";
            string username2 = "";

            float user1Debt = 0;
            float user2Debt = 0;

            foreach (var spending in movements)
            {
                switch (spending.User.Id)
                {
                    case 1:
                        username1 = spending.User.Name;
                        user2Debt += spending.Value - spending.UserShare;
                        break;
                    case 2:
                        username2 = spending.User.Name;
                        user1Debt += spending.Value - spending.UserShare;
                        break;
                    default:
                        break;
                }
            }

            Debt debt1 = new Debt();
            debt1.UserName = username1;
            debt1.Value = user1Debt;
            result.Results.Add(debt1);

            Debt debt2 = new Debt();
            debt2.UserName = username2;
            debt2.Value = user2Debt; 
            result.Results.Add(debt2);

            result.Successful = true;

            return result;
        }
        catch (System.Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    public async Task<ResultWrapper<Movement>> UpdateMovement(Movement inputMovement)
    {
        ResultWrapper<Movement> result = new ResultWrapper<Movement>();

        try
        {
            Movement movementToUpdate = await _repository.Movement(inputMovement.Id);

            movementToUpdate.Description = string.IsNullOrWhiteSpace(inputMovement.Description) ? movementToUpdate.Description : inputMovement.Description;
            movementToUpdate.Value = inputMovement.Value == 0 ? movementToUpdate.Value : inputMovement.Value;
            movementToUpdate.UserShare = inputMovement.UserShare == 0 ? movementToUpdate.UserShare : inputMovement.UserShare;

            Movement updatedMovement = await _repository.UpdateMovement(movementToUpdate);

            result.Results.Add(updatedMovement);
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
