using LearnFlow.Domain.Models.Lesson;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/lesson-sections")]
    [ApiController]
    [Authorize]
    public class LessonSectionController : ControllerBase
    {
        internal BusinessLayer.Interfaces.ILessonSectionService _sections;

        public LessonSectionController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _sections = bl.LessonSectionAction();
        }

        [HttpGet("lesson/{lessonId}")]
        [AllowAnonymous]
        public IActionResult GetByLesson(int lessonId)
        {
            var data = _sections.GetByLesson(lessonId);
            return Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateLessonSectionDto dto)
        {
            var result = _sections.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] CreateLessonSectionDto dto)
        {
            var result = _sections.Update(id, dto);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _sections.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }
    }
}
