using LearnFlow.Domain.Models.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/notifications")]
    [ApiController]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        internal BusinessLayer.Interfaces.INotificationService _notifications;

        public NotificationController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _notifications = bl.NotificationAction();
        }

        [HttpGet("user/{userId}")]
        public IActionResult GetByUser(int userId, [FromQuery] string? type, [FromQuery] bool? unreadOnly)
        {
            var data = _notifications.GetByUser(userId);

            if (!string.IsNullOrEmpty(type))
                data = data.Where(n => n.Type.Equals(type, StringComparison.OrdinalIgnoreCase)).ToList();

            if (unreadOnly == true)
                data = data.Where(n => !n.IsRead).ToList();

            return Ok(data);
        }

        [HttpPut("{id}/read")]
        public IActionResult MarkRead(int id)
        {
            var result = _notifications.MarkRead(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _notifications.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateNotificationDto dto)
        {
            var result = _notifications.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }
    }
}
