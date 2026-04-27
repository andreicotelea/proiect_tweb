namespace LearnFlow.Domain.Models.Notification
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int? UserId { get; set; }
        public bool IsRead { get; set; }
        public string CreatedAt { get; set; } = string.Empty;
    }
}
