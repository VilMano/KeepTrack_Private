using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController] // Controller level
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate(string username, string password)
    {
        var model = new AuthenticateRequest { Username = username, Password = password };
        var response = await _userService.Authenticate(model);

        if (response == null)
            return BadRequest(new { message = "Username or password is incorrect" });

        return Ok(response);
    }

    [Authorize]
    [HttpGet("user/{id}")]
    public async Task<User> GetUser(string id)
    {
        ResultWrapper<User> user = await _userService.FetchUser(id);

        return user.Results.FirstOrDefault();

    }
}
