using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.Domain.Models.User;

namespace LearnFlow.API.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IUserService _users;

    public UsersController(IUserService users)
    {
        _users = users;
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
    public IActionResult Update(int id, [FromBody] UserDto dto)
    {
        var result = _users.Update(id, dto);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Message });

        return Ok(new { message = result.Message });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var result = _users.Delete(id);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Message });

        return Ok(new { message = result.Message });
    }
}
