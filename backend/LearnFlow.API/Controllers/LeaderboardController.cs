using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.API.Controllers;

[ApiController]
[Route("api/leaderboard")]
public class LeaderboardController : ControllerBase
{
    private readonly ILeaderboardService _leaderboard;

    public LeaderboardController(ILeaderboardService leaderboard)
    {
        _leaderboard = leaderboard;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var data = _leaderboard.GetLeaderboard();
        return Ok(new { data });
    }
}
