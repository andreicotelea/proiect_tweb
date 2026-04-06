using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
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
