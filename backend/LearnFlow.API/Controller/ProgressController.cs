using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.Progress;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/progress")]
    [ApiController]
    [Authorize]
    public class ProgressController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.IProgressService _progress;

        public ProgressController()
        {
            var bl = new BusinessLogic();
            _progress = bl.ProgressAction();
        }

        [HttpGet("{userId}")]
        public IActionResult GetByUser(int userId)
        {
            var data = _progress.GetByUser(userId);
            return Ok(new { data });
        }

        [HttpPost]
        public IActionResult Update(UpdateProgressDto dto)
        {
            var result = _progress.UpdateProgress(dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }
    }
}
