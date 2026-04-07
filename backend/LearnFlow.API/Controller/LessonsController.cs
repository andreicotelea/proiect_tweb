using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.Lesson;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/lessons")]
    [ApiController]
    [Authorize]
    public class LessonsController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.ILessonService _lessons;

        public LessonsController()
        {
            var bl = new BusinessLogic();
            _lessons = bl.LessonAction();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll(
            [FromQuery] string? category,
            [FromQuery] string? difficulty,
            [FromQuery] string? search)
        {
            var data = _lessons.GetAll(category, difficulty, search);
            return Ok(new { data });
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var lesson = _lessons.GetById(id);
            if (lesson == null)
                return NotFound(new { message = "Lectia nu a fost gasita" });

            return Ok(new { data = lesson });
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create(CreateLessonDto dto)
        {
            var result = _lessons.Create(dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, UpdateLessonDto dto)
        {
            var result = _lessons.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _lessons.Delete(id);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }
    }
}
