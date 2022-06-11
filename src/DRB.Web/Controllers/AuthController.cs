using Microsoft.AspNetCore.Mvc;

namespace DRB.Web.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        this._logger = logger;
    }
}