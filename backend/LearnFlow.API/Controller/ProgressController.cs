using LearnFlow.Domain.Models.Progress;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace LearnFlow.API.Controller
{
    [Route("api/progress")]
    [ApiController]
    [Authorize]
    public class ProgressController : ControllerBase
    {
        internal BusinessLayer.Interfaces.IProgressService _progress;

        public ProgressController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _progress = bl.ProgressAction();
        }

        [HttpGet("{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var data = _progress.GetByUser(userId);
            return Ok(data);
        }

        [HttpPost]
        [EnableRateLimiting("submit")]
        public IActionResult Update([FromBody] UpdateProgressDto dto)
        {
            var result = _progress.UpdateProgress(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpPost("enroll")]
        public IActionResult Enroll([FromBody] EnrollDto dto)
        {
            var result = _progress.Enroll(dto.UserId, dto.LessonId);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }
    }
}
