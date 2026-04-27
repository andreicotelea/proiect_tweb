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
        public IActionResult Get([FromQuery] string? sortBy)
        {
            var data = _leaderboard.GetLeaderboard();

            if (!string.IsNullOrEmpty(sortBy))
            {
                data = sortBy.ToLower() switch
                {
                    "points" => data.OrderByDescending(x => x.Points).ToList(),
                    "lessons" => data.OrderByDescending(x => x.Lessons).ToList(),
                    "name" => data.OrderBy(x => x.Name).ToList(),
                    _ => data
                };

                for (int i = 0; i < data.Count; i++)
                    data[i].Rank = i + 1;
            }

            return Ok(data);
        }
    }
}
