using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.User;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.IAuthService _auth;

        public AuthController()
        {
            var bl = new BusinessLogic();
            _auth = bl.GetAuthActions();
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginDto dto)
        {
            var user = _auth.Login(dto.Email, dto.Password);
            if (user == null)
                return Unauthorized(new { message = "Email sau parola incorecta" });

            return Ok(new { data = user, message = "Conectare reusita" });
        }

        [HttpPost("register")]
        public IActionResult Register(UserRegisterDto dto)
        {
            var result = _auth.Register(dto);
            if (!result.IsSuccess)
                return BadRequest(new { message = result.Message });

            return Ok(result);
        }

        [HttpGet("me/{id}")]
        public IActionResult Me(int id)
        {
            var user = _auth.GetById(id);
            if (user == null)
                return NotFound(new { message = "Utilizatorul nu a fost gasit" });

            return Ok(new { data = user });
        }
    }
}
