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
    public IActionResult GetAll(
        [FromQuery] string? category,
        [FromQuery] string? difficulty,
        [FromQuery] string? search)
    {
        var data = _lessons.GetAll(category, difficulty, search);
        return Ok(new { data });
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var lesson = _lessons.GetById(id);
        if (lesson == null)
            return NotFound(new { message = "Lectia nu a fost gasita" });

        return Ok(new { data = lesson });
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateLessonDto dto)
    {
        var result = _lessons.Create(dto);
        return Ok(new { message = result.Message });
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] UpdateLessonDto dto)
    {
        var result = _lessons.Update(id, dto);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Message });

        return Ok(new { message = result.Message });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var result = _lessons.Delete(id);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Message });

        return Ok(new { message = result.Message });
    }
}
