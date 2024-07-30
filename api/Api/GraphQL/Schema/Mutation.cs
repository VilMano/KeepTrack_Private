using System.Runtime.CompilerServices;

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
        public async Task<Movement> CreateMovement(Movement movement, [Service] MovementService service)
        {
            ResultWrapper<Movement> newMovement = await service.CreateMovement(movement);

            if(newMovement.Successful)
                return newMovement.Results.FirstOrDefault();

            return null;
        }

        /// <summary>
        /// Updates a movement
        /// </summary>
        /// <param name="movement">Movement to update [id is mandatory]</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<Movement> UpdateMovement(Movement movement, [Service] MovementService service)
        {
            ResultWrapper<Movement> updatedMovement = await service.UpdateMovement(movement);

            if(updatedMovement.Successful)
                return updatedMovement.Results.FirstOrDefault();

            return null;
        }

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="id">Id of the movement to delete</param>
        /// <returns>Task<bool></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<bool> DeleteMovement(int id, [Service] MovementService service)
        {
            ResultWrapper<bool> result = await service.DeleteMovement(id);

            return result.Successful;
        }

        #endregion


        #region USERS
        /// <summary>
        /// Deletes user
        /// </summary>
        /// <param name="id">Id of the user to delete</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<bool> DeleteUser(string id, [Service] UserService service)
        {
            ResultWrapper<bool> deleted = await service.DeleteUser(id);

            return deleted.Successful;
        }

        /// <summary>
        /// Creates a user
        /// </summary>
        /// <param name="user">User to create</param>
        /// <returns>Task<User></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<User> CreateUser(User user, [Service] UserService service)
        {
            ResultWrapper<User> createdUser = await service.CreateUser(user);

            if(createdUser.Successful)
                return createdUser.Results.FirstOrDefault();

            return null;
        }

        /// <summary>
        /// Updates a user
        /// </summary>
        /// <param name="user">User to update [id is mandatory]</param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<User> UpdateUser(User user, [Service] UserService service)
        {
            ResultWrapper<User> updatedUser = await service.UpdateUser(user);

            if(updatedUser.Successful)
                return updatedUser.Results.FirstOrDefault();

            return null;
        }

        #endregion
    }
}
