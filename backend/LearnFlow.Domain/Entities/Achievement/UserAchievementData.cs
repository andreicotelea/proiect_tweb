using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.User;

namespace LearnFlow.Domain.Entities.Achievement;

public class UserAchievementData
{
    [Required]
    public int UserId { get; set; }

    [Required]
    public int AchievementId { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime EarnedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    public UserData User { get; set; } = null!;

    [ForeignKey("AchievementId")]
    public AchievementData Achievement { get; set; } = null!;
}
