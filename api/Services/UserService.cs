using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

public class UserService : IUserService
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository, IConfiguration configuration)
    {
        _repository = repository;
        _configuration = configuration;
    }

    public async Task<AuthenticateResponse?> Authenticate(AuthenticateRequest model)
    {
        var users = await _repository.Users(x =>
            x.UserName == model.Username && x.Password == model.Password);

        var user = users.FirstOrDefault();

        // return null if user not found
        if (user == null)
            return null;

        // authentication successful so generate jwt token
        var token = await generateJwtToken(user);

        return new AuthenticateResponse(user, token);
    }

    public async Task<ResultWrapper<User>> CreateUser(User inputUser)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            var passwordHasher = new PasswordHasher<User>();
            var hashed = passwordHasher.HashPassword(inputUser, inputUser.Password);
            inputUser.PasswordHash = hashed;

            User user = await _repository.CreateUser(inputUser);

            result.Results.Add(user);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<bool>> DeleteUser(string id)
    {
        ResultWrapper<bool> result = new ResultWrapper<bool>();

        try
        {
            User userToDelete = await _repository.User(id);

            if (userToDelete != null)
            {
                bool res = await _repository.DeleteUser(userToDelete);
                result.Successful = res;
            }

            result.Errors.Add("User to delete was not found.");
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<User>> FetchUser(string id)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            User user = await _repository.User(id);
            result.Results.Add(user);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    public async Task<ResultWrapper<User>> UpdateUser(User inputUser)
    {
        ResultWrapper<User> result = new ResultWrapper<User>();

        try
        {
            User user = await _repository.UpdateUser(inputUser);
            result.Results.Add(user);
            result.Successful = true;
        }
        catch (Exception ex)
        {
            result.Errors.Add(ex.Message);
            throw;
        }

        return result;
    }

    // helper methods
    private async Task<string> generateJwtToken(User user)
    {
        //Generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = await Task.Run(() =>
        {
            var key = Encoding.ASCII.GetBytes(_configuration["ApiKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = "issuer",
                Audience = "audience",
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };
            return tokenHandler.CreateToken(tokenDescriptor);
        });

        return tokenHandler.WriteToken(token);
    }
}
