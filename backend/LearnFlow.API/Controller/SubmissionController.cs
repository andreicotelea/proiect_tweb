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

        [HttpPost]
        public IActionResult Create([FromBody] CreateSubmissionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _submissions.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }
    }
}
