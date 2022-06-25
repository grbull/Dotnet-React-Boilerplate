using DRB.Web.Data.Entities;
using DRB.Web.DTOs;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DRB.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;
    private readonly IClientRequestParametersProvider _clientRequestParametersProvider;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(
        ILogger<AuthController> logger,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager, 
        IClientRequestParametersProvider clientRequestParametersProvider)
    {
        this._logger = logger;
        this._userManager = userManager;
        this._signInManager = signInManager;
        this._clientRequestParametersProvider = clientRequestParametersProvider;
    }
    
    // http://localhost:7170/Auth/_configuration/DRB.Web
    [HttpGet("_configuration/{clientId}")]
    public IActionResult GetClientRequestParameters([FromRoute] string clientId)
    {
        var parameters = this._clientRequestParametersProvider.GetClientParameters(HttpContext, clientId);
        
        return Ok(parameters);
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] UserRegisterDTO registerDto)
    {
        // TODO: Will need to check email too, lets see the behavior when the email/user has been used.
        // TODO: we have to validate username and email
        var user = await this._userManager.FindByNameAsync(registerDto.UserName);
        if (user is not null)
        {
            return this.Conflict();
        }

        user = new ApplicationUser()
        {
            Id = Guid.NewGuid().ToString(),
            UserName = registerDto.UserName,
            Email = registerDto.Email
        };

        var result = await this._userManager.CreateAsync(user, registerDto.Password);
        
        
        if (result.Succeeded)
        {
            this._logger.LogInformation("User created a new account with password.");
            
            if (!this._userManager.Options.SignIn.RequireConfirmedAccount)
            {
                await this._signInManager.SignInAsync(user, isPersistent: false);
            }
            
            return this.Ok();
        }

        this._logger.LogInformation("Unable to create a new user.");
        return this.Problem();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] UserLoginDTO loginDto)
    {
        var result = await _signInManager.PasswordSignInAsync(
            loginDto.UserName,
            loginDto.Password,
            loginDto.RememberMe,
            lockoutOnFailure: true);

        if (result.Succeeded)
        {
            this._logger.LogInformation($"User logged in.");
            return this.Ok();
        }

        this._logger.LogWarning("User account locked out.");
        return this.Forbid();
    }

    [Authorize]
    [HttpGet("test")]
    public IActionResult Test()
    {
        return this.Ok();
    }
}