using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.DTOs;
using LearnFlow.BusinessLayer.Interfaces;

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
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _auth.Login(dto.Email, dto.Password);
        if (user == null)
            return Unauthorized(new { message = "Email sau parola incorecta" });

        HttpContext.Session.SetInt32("UserId", user.Id);
        HttpContext.Session.SetString("UserRole", user.Role);

        return Ok(new { data = new { user }, message = "Conectare reusita" });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var user = await _auth.Register(dto);
            HttpContext.Session.SetInt32("UserId", user.Id);
            HttpContext.Session.SetString("UserRole", user.Role);

            return Ok(new { data = new { user }, message = "Inregistrare reusita" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return Ok(new { message = "Deconectare reusita" });
    }

    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var userId = HttpContext.Session.GetInt32("UserId");
        if (userId == null)
            return Unauthorized(new { message = "Nu esti autentificat" });

        var user = await _auth.GetCurrentUser(userId.Value);
        if (user == null)
            return NotFound(new { message = "Utilizatorul nu a fost gasit" });

        return Ok(new { data = new { user } });
    }
}
