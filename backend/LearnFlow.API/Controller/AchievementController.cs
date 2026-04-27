using LearnFlow.Domain.Models.Achievement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/achievements")]
    [ApiController]
    [Authorize]
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
        public IActionResult GetAll()
        {
            var data = _achievements.GetAll();
            return Ok(data);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var achievement = _achievements.GetById(id);
            if (achievement == null)
                return NotFound(new { isSuccess = false, message = "Achievement-ul nu a fost gasit." });
            return Ok(achievement);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateAchievementDto dto)
        {
            var result = _achievements.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] CreateAchievementDto dto)
        {
            var result = _achievements.Update(id, dto);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _achievements.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }
    }
}
