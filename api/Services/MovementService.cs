using System.Data.Common;
using Microsoft.Extensions.ObjectPool;
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

    public async Task<ResultWrapper<Debt>> GetMonthlyDebtsByUser(int month)
    {
        ResultWrapper<Debt> result = new ResultWrapper<Debt>();
        try
        {
            var movements = await _repository.Movements(m =>
                m.CreatedOn.Month == month && m.CreatedOn.Year == DateTime.UtcNow.Year
            );

            List<User> users = await _userRepository.Users(u => u.Id != "");

            List<Debt> debts = new List<Debt>();

            users.Sort((p, q) => p.Id.CompareTo(q.Id));

            // create empty user slot
            debts.Add(new Debt());
            debts.Add(new Debt());

            int it = 0;
            foreach (User user in users)
            {
                // create user object
                debts[it].UserName = user.Name;

                it++;

                foreach (var spending in movements.Where(m => m.User.Id == user.Id))
                {
                    debts[it].Value += spending.Value - spending.UserShare;
                }
            }

            result.Results = debts;
            result.Successful = true;

            return result;
        }
        catch (System.Exception ex)
        {
            Console.WriteLine(ex.Message);
            throw;
        }
    }

    public async Task<ResultWrapper<User>> GetMonthlyMovementsByUser(int month)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            var movements = await _repository.Movements(m =>
                m.CreatedOn.Month == month && m.CreatedOn.Year == DateTime.UtcNow.Year
            );

            List<User> users = await _userRepository.Users(u => u.Id != "");
            List<User> userMovements = new List<User>();
            int it = 0;

            users.Sort((p, q) => p.Id.CompareTo(q.Id));
            foreach (User user in users)
            {
                // create empty user slot
                userMovements.Add(new User());

                // create user object
                User newUser = new User();
                newUser.Id = user.Id;
                newUser.Name = user.Name;

                // insert user
                userMovements[it] = newUser;

                foreach (Movement movement in movements.Where(m => m.User.Id == user.Id))
                {
                    userMovements[it].Movements.Add(movement);
                }

                it++;
            }

            result.Results.Add(userMovements[0]);
            result.Results.Add(userMovements[1]);

            result.Successful = true;
        }
        catch (System.Exception)
        {
            result.Successful = false;
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<Movement>> UpdateMovement(Movement inputMovement)
    {
        ResultWrapper<Movement> result = new ResultWrapper<Movement>();

        try
        {
            Movement movementToUpdate = await _repository.Movement(inputMovement.Id);

            if (string.IsNullOrWhiteSpace(inputMovement.Description))
                movementToUpdate.Description = movementToUpdate.Description;
            else
                movementToUpdate.Description = inputMovement.Description;

            if (inputMovement.Value == 0)
                movementToUpdate.Value = movementToUpdate.Value;
            else
                movementToUpdate.Value = inputMovement.Value;

            if (inputMovement.UserShare == 0)
                movementToUpdate.UserShare = movementToUpdate.UserShare;
            else
                movementToUpdate.UserShare = inputMovement.UserShare;

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
