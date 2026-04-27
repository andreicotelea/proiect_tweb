using LearnFlow.Domain.Models.Notification;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class NotificationActionExecution : Core.NotificationActions, INotificationService
    {
        public List<NotificationDto> GetByUser(int userId) => GetByUserActionExecution(userId);
        public List<NotificationDto> GetAll() => GetAllActionExecution();
        public ActionResponse Create(CreateNotificationDto dto) => CreateActionExecution(dto);
        public ActionResponse MarkAsRead(int id) => MarkAsReadActionExecution(id);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
