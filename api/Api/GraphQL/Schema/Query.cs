namespace Api.GraphQL.Shcema
{
    [HotChocolate.Authorization.Authorize]
    public class Query : IQuery
    {
        public Query() { }

        #region MOVEMENTS

        /// <summary>
        /// Gets a movement by id
        /// </summary>
        /// <param name="id">Id of the requested movement</param>
        /// <returns>Task<User></returns>
        public async Task<Movement> GetMovement(int id, [Service] MovementService service)
        {
            ResultWrapper<Movement> movement = await service.FetchMovement(id);

            if (movement.Successful)
                return movement.Results.FirstOrDefault();

            return null;
        }

        /// <summary>
        /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
        /// </summary>
        /// <param name="month">Input from 0 - 11</param>
        /// <returns>Task<List<Movement>></returns>
        public async Task<List<Debt>>? GetMonthlyDebtByUser(
            int month,
            [Service] MovementService service
        )
        {
            ResultWrapper<Debt> totalExpensesByUser = await service.GetMonthlyDebtsByUser(month);

            return totalExpensesByUser.Results.ToList();
        }

        /// <summary>
        /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
        /// </summary>
        /// <param name="month">Input from 0 - 11</param>
        /// <returns>Task<List<Movement>></returns>
        public async Task<List<UserDTO>>? GetMonthlyMovementsByUser(
            int month,
            [Service] MovementService service
        )
        {
            ResultWrapper<UserDTO> users = new ResultWrapper<UserDTO>();
            try
            {
                users = await service.GetMonthlyMovementsByUser(month);

                if (users.Successful)
                    return users.Results.ToList();
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }

            return users.Results.ToList();
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

            if (user.Successful)
                return user.Results.FirstOrDefault();

            return null;
        }
        #endregion
    }

    class InputUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Movement> Movements { get; set; } = new List<Movement>();
    }
}
