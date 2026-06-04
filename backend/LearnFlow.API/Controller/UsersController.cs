using LearnFlow.Domain.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LearnFlow.API.Extensions;

namespace LearnFlow.API.Controller
{
    [Route("api/users")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        internal BusinessLayer.Interfaces.IUserService _users;

        public UsersController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _users = bl.UserAction();
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll([FromQuery] string? search)
        {
            try
            {
                var data = _users.GetAll();

                if (!string.IsNullOrEmpty(search))
                {
                    data = data.Where(u =>
                        (u.Name ?? "").Contains(search, StringComparison.OrdinalIgnoreCase) ||
                        (u.Email ?? "").Contains(search, StringComparison.OrdinalIgnoreCase)
                    ).ToList();
                }

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { isSuccess = false, message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var user = _users.GetById(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] UserDto dto)
        {
            var result = _users.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserId = User.GetId();
            var currentUserRole = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
            if (currentUserId != id && currentUserRole != "admin")
            {
                return Forbid();
            }
            var result = _users.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpPut("{id}/profile")]
        public IActionResult UpdateProfile(int id, [FromBody] UpdateUserProfileDto dto)
        {
            var result = _users.UpdateProfile(id, dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("{id}/password")]
        public IActionResult ChangePassword(int id, [FromBody] ChangePasswordDto dto)
        {
            var result = _users.ChangePassword(id, dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

    }
}
