using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/leaderboard")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.ILeaderboardService _leaderboard;

        public LeaderboardController()
        {
            var bl = new BusinessLogic();
            _leaderboard = bl.LeaderboardAction();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _leaderboard.GetLeaderboard();
            return Ok(new { data });
        }
    }
}
