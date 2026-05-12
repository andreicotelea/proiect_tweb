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
        public IActionResult GetByUser(int userId)
        {
            var data = _notifications.GetByUser(userId);
            return Ok(data);
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public IActionResult GetAll()
        {
            var data = _notifications.GetAll();
            return Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateNotificationDto dto)
        {
            var result = _notifications.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }

        [HttpPut("{id}/read")]
        public IActionResult MarkAsRead(int id)
        {
            var result = _notifications.MarkAsRead(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _notifications.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }
    }
}
