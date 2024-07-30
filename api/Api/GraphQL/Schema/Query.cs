
namespace Api.GraphQL.Shcema
{
    public class Query : IQuery
    {
        public Query()
        {
        }

        #region MOVEMENTS

        /// <summary>
        /// Gets a movement by id
        /// </summary>
        /// <param name="id">Id of the requested movement</param>
        /// <returns>Task<User></returns>
        public async Task<Movement> GetMovement(int id, [Service] MovementService service)
        {
            ResultWrapper<Movement> movement = await service.FetchMovement(id);

            if(movement.Successful)
                return movement.Results.FirstOrDefault();

            return null;
        }

        /// <summary>
        /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
        /// </summary>
        /// <param name="month">Input from 0 - 11</param>
        /// <returns>Task<List<Movement>></returns>
        public async Task<List<Debt>> GetMonthlyDebtByUser(int month, [Service] MovementService service)
        {
            ResultWrapper<List<Debt>> movements =  new ResultWrapper<List<Debt>>();
            
            var totalExpensesByUser = await service.GetMonthlyDebtsByUser(month);
            if(totalExpensesByUser.Successful)
                return totalExpensesByUser.Results.ToList();
            
            return null;
        }

        /// <summary>
        /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
        /// </summary>
        /// <param name="month">Input from 0 - 11</param>
        /// <returns>Task<List<Movement>></returns>
        public async Task<List<User>> GetMonthlyMovementsByUser(int month, [Service] MovementService service)
        {
            ResultWrapper<List<User>> users =  new ResultWrapper<List<User>>();
            
            var totalExpensesByUser = await service.GetMonthlyMovementsByUser(month);
            if(totalExpensesByUser.Successful)
                return totalExpensesByUser.Results.ToList();
            
            return null;
        }
        #endregion

        #region USERS

        /// <summary>
        /// Gets a user by id
        /// </summary>
        /// <param name="id">Id of the requested user</param>
        /// <returns>Task<User></returns>
        [HotChocolate.Authorization.Authorize]
        public async Task<User> GetUser(string id, [Service] UserService service)
        {
            ResultWrapper<User> user = await service.FetchUser(id);

            if(user.Successful)
                return user.Results.FirstOrDefault();

            return null;
        }
        #endregion
    }

    class InputUser{
        public int Id {get; set;}
        public string Name { get; set;}
        public List<Movement> Movements { get; set; } = new List<Movement>();
    }
}
