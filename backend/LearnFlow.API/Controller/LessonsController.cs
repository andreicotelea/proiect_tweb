using LearnFlow.Domain.Models.Lesson;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/lessons")]
    [ApiController]
    [Authorize]
    public class LessonsController : ControllerBase
    {
        internal BusinessLayer.Interfaces.ILessonService _lessons;

        public LessonsController()
        {
            var bl = new BusinessLayer.BusinessLogic();
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
            return Ok(data);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var lesson = _lessons.GetById(id);
            if (lesson == null)
                return NotFound();

            return Ok(lesson);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateLessonDto dto)
        {
            var result = _lessons.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] UpdateLessonDto dto)
        {
            var result = _lessons.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _lessons.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }
    }
}
