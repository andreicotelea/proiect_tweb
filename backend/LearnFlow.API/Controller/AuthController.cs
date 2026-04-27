using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace LearnFlow.API.Controller
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        internal BusinessLayer.Interfaces.IAuthService _auth;

        public AuthController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _auth = bl.AuthAction();
        }

        [HttpPost("login")]
        [EnableRateLimiting("auth")]
        public IActionResult Login([FromBody] UserLoginDto dto)
        {
            var result = _auth.Login(dto);

            if (result == null)
                return Unauthorized(new ActionResponse
                {
                    IsSuccess = false,
                    Message = "Email sau parola incorecta"
                });

            return Ok(result);
        }

        [HttpPost("register")]
        [EnableRateLimiting("auth")]
        public IActionResult Register([FromBody] UserRegisterDto dto)
        {
            var result = _auth.Register(dto);

            if (!result.IsSuccess)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("me/{id}")]
        public IActionResult Me(int id)
        {
            var user = _auth.GetById(id);
            if (user == null)
                return NotFound(new { message = "Utilizatorul nu a fost gasit" });

            return Ok(user);
        }
    }
}
