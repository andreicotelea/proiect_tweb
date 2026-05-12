using LearnFlow.Domain.Models.Notification;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Notification;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class NotificationActions
    {
        protected NotificationActions() { }

        protected List<NotificationDto> GetByUserActionExecution(int userId)
        {
            using var context = new AppDbContext();
            return context.Notifications
                .Where(n => n.UserId == userId || n.UserId == null)
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    UserId = n.UserId,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
                }).ToList();
        }

        protected List<NotificationDto> GetAllActionExecution()
        {
            using var context = new AppDbContext();
            return context.Notifications
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    Type = n.Type,
                    UserId = n.UserId,
                    IsRead = n.IsRead,
                    CreatedAt = n.CreatedAt.ToString("yyyy-MM-dd HH:mm"),
                }).ToList();
        }

        protected ActionResponse CreateActionExecution(CreateNotificationDto dto)
        {
            using var context = new AppDbContext();
            var notification = new NotificationData
            {
                Title = dto.Title,
                Message = dto.Message,
                Type = dto.Type,
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow,
            };
            context.Notifications.Add(notification);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Notificare creata cu succes." };
        }

        protected ActionResponse MarkAsReadActionExecution(int id)
        {
            using var context = new AppDbContext();
            var notification = context.Notifications.FirstOrDefault(n => n.Id == id);
            if (notification == null)
                return new ActionResponse { IsSuccess = false, Message = "Notificarea nu a fost gasita." };
            notification.IsRead = true;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Notificare marcata ca citita." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var notification = context.Notifications.FirstOrDefault(n => n.Id == id);
            if (notification == null)
                return new ActionResponse { IsSuccess = false, Message = "Notificarea nu a fost gasita." };
            context.Notifications.Remove(notification);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Notificare stearsa." };
        }
    }
}
