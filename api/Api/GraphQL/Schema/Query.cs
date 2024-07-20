namespace Api.GraphQL.Shcema
{
    public class Query : IQuery
    {
        private readonly IApiKeyValidation _apiKeyValidation;

        public Query(IApiKeyValidation apiKeyValidation)
        {
            _apiKeyValidation = apiKeyValidation;
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
        public async Task<List<Debt>> GetThisMonthMovements(int month, [Service] MovementService service)
        {
            ResultWrapper<List<Debt>> movements =  new ResultWrapper<List<Debt>>();
            
            var totalExpensesByUser = await service.GetTotalByUser(month);
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
        public async Task<User> GetUser(int id, [Service] UserService service)
        {
            ResultWrapper<User> user = await service.FetchUser(id);

            if(user.Successful)
                return user.Results.FirstOrDefault();

            return null;
        }
        #endregion
    }
}
