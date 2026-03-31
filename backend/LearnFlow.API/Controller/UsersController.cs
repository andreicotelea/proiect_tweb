using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.User;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.IUserService _users;

        public UsersController()
        {
            var bl = new BusinessLogic();
            _users = bl.GetUserActions();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _users.GetAll();
            return Ok(new { data });
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _users.GetById(id);
            if (user == null)
                return NotFound(new { message = "Utilizatorul nu a fost gasit" });

            return Ok(new { data = user });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UserDto dto)
        {
            var result = _users.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _users.Delete(id);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }
    }
}
