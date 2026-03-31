namespace LearnFlow.Domain.Models.Progress
{
    public class ProgressDto
    {
        public int UserId { get; set; }
        public int LessonId { get; set; }
        public int PercentComplete { get; set; }
        public string? CompletedAt { get; set; }
        public string LastAccessedAt { get; set; } = string.Empty;
    }
}
