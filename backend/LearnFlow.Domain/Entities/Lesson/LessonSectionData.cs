using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LearnFlow.Domain.Entities.Lesson;

public class LessonSectionData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int LessonId { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(30)]
    public string Duration { get; set; } = "10 min";

    public int Order { get; set; }

    [ForeignKey("LessonId")]
    public LessonData Lesson { get; set; } = null!;
}
