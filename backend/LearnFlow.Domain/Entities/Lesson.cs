using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Entities;

public class Lesson
{
    public int Id { get; set; }

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public string Difficulty { get; set; } = "Beginner";

    public string Duration { get; set; } = "30 min";
    public double Rating { get; set; } = 0;
    public int StudentCount { get; set; } = 0;
    public string InstructorName { get; set; } = string.Empty;
    public string Thumbnail { get; set; } = "DF";
    public string? VideoUrl { get; set; }
    public bool IsLocked { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Category Category { get; set; } = null!;
    public ICollection<LessonSection> Sections { get; set; } = new List<LessonSection>();
    public ICollection<UserProgress> Progress { get; set; } = new List<UserProgress>();
}
