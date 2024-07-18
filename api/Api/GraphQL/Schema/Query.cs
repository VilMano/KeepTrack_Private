namespace Api.GraphQL.Shcema
{
    public class Query : IQuery
    {
        public Query() { }

        #region MOVEMENTS

        /// <summary>
        /// Gets a movement by id
        /// </summary>
        /// <param name="id">Id of the requested movement</param>
        /// <returns>Task<User></returns>
        public Task<Movement> GetMovement(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Gets all movements for a certain month (0 - Jan, 1 - Feb...)
        /// </summary>
        /// <param name="month">Input from 0 - 11</param>
        /// <returns>Task<List<Movement>></returns>
        public Task<List<Movement>> GetThisMonthMovements(int month)
        {
            throw new NotImplementedException();
        }
        #endregion

        #region USERS

        /// <summary>
        /// Gets a user by id
        /// </summary>
        /// <param name="id">Id of the requested user</param>
        /// <returns>Task<User></returns>
        public Task<User> GetUser(int id)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
