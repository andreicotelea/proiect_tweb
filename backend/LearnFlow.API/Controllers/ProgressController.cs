using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.DTOs;
using LearnFlow.BusinessLayer.Interfaces;

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
    public async Task<IActionResult> GetByUser(int userId)
    {
        var data = await _progress.GetByUser(userId);
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Update([FromBody] UpdateProgressDto dto)
    {
        var data = await _progress.UpdateProgress(dto);
        return Ok(new { data });
    }
}
