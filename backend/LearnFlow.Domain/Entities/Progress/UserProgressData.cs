using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Entities.Lesson;

namespace LearnFlow.Domain.Entities.Progress;

public class UserProgressData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public int LessonId { get; set; }

    public int PercentComplete { get; set; } = 0;

    [DataType(DataType.DateTime)]
    public DateTime? CompletedAt { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime LastAccessedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    public UserData User { get; set; } = null!;

    [ForeignKey("LessonId")]
    public LessonData Lesson { get; set; } = null!;
}
