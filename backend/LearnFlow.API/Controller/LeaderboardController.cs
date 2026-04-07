using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/leaderboard")]
    [ApiController]
    public class LeaderboardController : ControllerBase
    {
        internal BusinessLayer.Interfaces.ILeaderboardService _leaderboard;

        public LeaderboardController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _leaderboard = bl.LeaderboardAction();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var data = _leaderboard.GetLeaderboard();
            return Ok(data);
        }
    }
}
