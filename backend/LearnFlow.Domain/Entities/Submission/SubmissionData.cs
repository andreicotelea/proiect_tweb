using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.User;

namespace LearnFlow.Domain.Entities.Submission;

public class SubmissionData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int LessonId { get; set; }

    public int Score { get; set; }
    public int MaxScore { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    public UserData User { get; set; } = null!;
}
