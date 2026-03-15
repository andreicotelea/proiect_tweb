namespace LearnFlow.Domain.Entities;

public class Submission
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public int Score { get; set; }
    public int MaxScore { get; set; }
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
