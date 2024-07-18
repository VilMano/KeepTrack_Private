namespace Api.GraphQL.Shcema
{
    public class Mutation : IMutation
    {
        public Mutation() { }

        #region MOVEMENTS

        /// <summary>
        /// Creates a movement
        /// </summary>
        /// <param name="movement">Movement to create</param>
        /// <returns>Task<Movement></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<Movement> CreateMovement(Movement movement)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Updates a movement
        /// </summary>
        /// <param name="movement">Movement to update [id is mandatory]</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<Movement> UpdateMovement(Movement movement)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="id">Id of the movement to delete</param>
        /// <returns>Task<bool></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<bool> DeleteMovement(int id)
        {
            throw new NotImplementedException();
        }

        #endregion


        #region USERS
        /// <summary>
        /// Deletes user
        /// </summary>
        /// <param name="id">Id of the user to delete</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<bool> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Creates a user
        /// </summary>
        /// <param name="user">User to create</param>
        /// <returns>Task<User></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<User> CreateUser(User user)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="user">User to update [id is mandatory]</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public Task<User> UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}
