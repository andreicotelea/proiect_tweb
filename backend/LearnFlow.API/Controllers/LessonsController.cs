using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.Domain.Models.Lesson;

namespace LearnFlow.API.Controllers;

[ApiController]
[Route("api/lessons")]
public class LessonsController : ControllerBase
{
    private readonly ILessonService _lessons;

    public LessonsController(ILessonService lessons)
    {
        _lessons = lessons;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? category,
        [FromQuery] string? difficulty,
        [FromQuery] string? search)
    {
        var data = await _lessons.GetAll(category, difficulty, search);
        return Ok(new { data });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var lesson = await _lessons.GetById(id);
        if (lesson == null)
            return NotFound(new { message = "Lectia nu a fost gasita" });

        return Ok(new { data = lesson });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLessonDto dto)
    {
        var lesson = await _lessons.Create(dto);
        return Ok(new { data = lesson, message = "Lectie creata cu succes" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateLessonDto dto)
    {
        var lesson = await _lessons.Update(id, dto);
        if (lesson == null)
            return NotFound(new { message = "Lectia nu a fost gasita" });

        return Ok(new { data = lesson, message = "Lectie actualizata" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _lessons.Delete(id);
        if (!deleted)
            return NotFound(new { message = "Lectia nu a fost gasita" });

        return Ok(new { message = "Lectie stearsa" });
    }
}
