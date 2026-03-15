using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.DTOs;
using LearnFlow.BusinessLayer.Interfaces;

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
    public async Task<IActionResult> GetAll()
    {
        var data = await _users.GetAll();
        return Ok(new { data });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _users.GetById(id);
        if (user == null)
            return NotFound(new { message = "Utilizatorul nu a fost gasit" });

        return Ok(new { data = user });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UserDto dto)
    {
        var user = await _users.Update(id, dto);
        if (user == null)
            return NotFound(new { message = "Utilizatorul nu a fost gasit" });

        return Ok(new { data = user, message = "Utilizator actualizat" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _users.Delete(id);
        if (!deleted)
            return NotFound(new { message = "Utilizatorul nu a fost gasit" });

        return Ok(new { message = "Utilizator sters" });
    }
}
