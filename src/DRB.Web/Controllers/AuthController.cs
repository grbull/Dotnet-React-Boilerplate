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
        var user = await this._userManager.FindByNameAsync(registerDto.UserName);
        if (user is null)
        {
            // TODO: Return a more appropriate response
            return this.Ok();
        }
        
        user = new ApplicationUser()
        {
            Id = new Guid().ToString(),
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };
        await this._userManager.CreateAsync(user, registerDto.Password);

        return this.Ok();
    }
}