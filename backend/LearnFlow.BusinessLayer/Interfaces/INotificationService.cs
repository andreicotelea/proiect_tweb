using LearnFlow.Domain.Models.Notification;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface INotificationService
{
    List<NotificationDto> GetByUser(int userId);
    List<NotificationDto> GetAll();
    ActionResponse Create(CreateNotificationDto dto);
    ActionResponse MarkAsRead(int id);
    ActionResponse Delete(int id);
}
