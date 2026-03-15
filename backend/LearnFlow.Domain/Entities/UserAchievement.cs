namespace LearnFlow.Domain.Entities;

public class UserAchievement
{
    public int UserId { get; set; }
    public int AchievementId { get; set; }
    public DateTime EarnedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
    public Achievement Achievement { get; set; } = null!;
}
