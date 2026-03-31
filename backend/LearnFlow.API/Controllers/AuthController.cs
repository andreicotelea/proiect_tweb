using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.Domain.Models.User;

namespace LearnFlow.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto dto)
    {
        var user = _auth.Login(dto.Email, dto.Password);
        if (user == null)
            return Unauthorized(new { message = "Email sau parola incorecta" });

        HttpContext.Session.SetInt32("UserId", user.Id);
        HttpContext.Session.SetString("UserRole", user.Role);

        return Ok(new { data = new { user }, message = "Conectare reusita" });
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegisterDto dto)
    {
        var result = _auth.Register(dto);
        if (!result.IsSuccess)
            return BadRequest(new { message = result.Message });

        return Ok(new { message = result.Message });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return Ok(new { message = "Deconectare reusita" });
    }

    [HttpGet("me")]
    public IActionResult Me()
    {
        var userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null)
            return Unauthorized(new { message = "Nu esti autentificat" });

        var user = _auth.GetById(userId.Value);
        if (user == null)
            return NotFound(new { message = "Utilizatorul nu a fost gasit" });

        return Ok(new { data = new { user } });
    }
}
