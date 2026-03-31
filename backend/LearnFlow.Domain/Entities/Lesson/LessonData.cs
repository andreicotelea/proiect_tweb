using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.Category;
using LearnFlow.Domain.Entities.Progress;

namespace LearnFlow.Domain.Entities.Lesson;

public class LessonData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Required]
    public int CategoryId { get; set; }

    [Required]
    [StringLength(20)]
    public string Difficulty { get; set; } = "Beginner";

    [StringLength(30)]
    public string Duration { get; set; } = "30 min";

    public double Rating { get; set; } = 0;
    public int StudentCount { get; set; } = 0;

    [StringLength(100)]
    public string InstructorName { get; set; } = string.Empty;

    [StringLength(10)]
    public string Thumbnail { get; set; } = "DF";

    public string? VideoUrl { get; set; }
    public bool IsLocked { get; set; } = false;

    [DataType(DataType.DateTime)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("CategoryId")]
    public CategoryData Category { get; set; } = null!;
    public ICollection<LessonSectionData> Sections { get; set; } = new List<LessonSectionData>();
    public ICollection<UserProgressData> Progress { get; set; } = new List<UserProgressData>();
}
