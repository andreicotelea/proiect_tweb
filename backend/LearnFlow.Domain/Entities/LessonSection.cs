using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Entities;

public class LessonSection
{
    public int Id { get; set; }
    public int LessonId { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Duration { get; set; } = "10 min";
    public int Order { get; set; }

    public Lesson Lesson { get; set; } = null!;
}
