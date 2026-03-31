using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.Domain.Models.Progress;

namespace LearnFlow.API.Controllers;

[ApiController]
[Route("api/progress")]
public class ProgressController : ControllerBase
{
    private readonly IProgressService _progress;

    public ProgressController(IProgressService progress)
    {
        _progress = progress;
    }

    [HttpGet("{userId}")]
    public IActionResult GetByUser(int userId)
    {
        var data = _progress.GetByUser(userId);
        return Ok(new { data });
    }

    [HttpPost]
    public IActionResult Update([FromBody] UpdateProgressDto dto)
    {
        var result = _progress.UpdateProgress(dto);
        return Ok(new { message = result.Message });
    }
}
