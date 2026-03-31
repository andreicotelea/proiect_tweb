using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.Progress;
using LearnFlow.Domain.Entities.Submission;
using LearnFlow.Domain.Entities.Achievement;

namespace LearnFlow.Domain.Entities.User;

public class UserData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(150)]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [StringLength(20)]
    public string Role { get; set; } = "student";

    [StringLength(10)]
    public string Avatar { get; set; } = "U";

    [DataType(DataType.DateTime)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserProgressData> Progress { get; set; } = new List<UserProgressData>();
    public ICollection<SubmissionData> Submissions { get; set; } = new List<SubmissionData>();
    public ICollection<UserAchievementData> Achievements { get; set; } = new List<UserAchievementData>();
}
