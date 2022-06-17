using DRB.Web.Data.Entities;
using DRB.Web.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DRB.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;

    public AuthController(ILogger<AuthController> logger, UserManager<ApplicationUser> userManager)
    {
        this._logger = logger;
        this._userManager = userManager;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] UserRegisterDTO registerDto)
    {
        // TODO: Will need to check email too, lets see the behavior when the email/user has been used.
        var user = await this._userManager.FindByNameAsync(registerDto.UserName);
        if (user is not null)
        {
            return this.Conflict();
        }
        
        user = new ApplicationUser()
        {
            Id = new Guid().ToString(),
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };

        try
        {
            await this._userManager.CreateAsync(user, registerDto.Password);
            return this.Ok();
        }
        catch (Exception exception)
        {
            this._logger.LogError(exception.Message, exception.StackTrace);
            return this.Problem();
        }

    }
}