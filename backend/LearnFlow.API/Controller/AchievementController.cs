using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/achievements")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        internal BusinessLayer.Interfaces.IAchievementService _achievements;

        public AchievementController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _achievements = bl.AchievementAction();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll([FromQuery] string? search)
        {
            var data = _achievements.GetAll();

            if (!string.IsNullOrEmpty(search))
                data = data.Where(a => a.Title.Contains(search, StringComparison.OrdinalIgnoreCase)).ToList();

            return Ok(data);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var achievement = _achievements.GetById(id);
            if (achievement == null)
                return NotFound(new { isSuccess = false, message = "Realizarea nu a fost gasita." });
            return Ok(achievement);
        }
    }
}
