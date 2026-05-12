using LearnFlow.Domain.Models.Submission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/submissions")]
    [ApiController]
    [Authorize]
    public class SubmissionController : ControllerBase
    {
        internal BusinessLayer.Interfaces.ISubmissionService _submissions;

        public SubmissionController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _submissions = bl.SubmissionAction();
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var data = _submissions.GetByUser(userId);
            return Ok(data);
        }

        [HttpGet("lesson/{lessonId}")]
        public IActionResult GetByLesson(int lessonId)
        {
            var data = _submissions.GetByLesson(lessonId);
            return Ok(data);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateSubmissionDto dto)
        {
            var result = _submissions.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _submissions.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }
    }
}
