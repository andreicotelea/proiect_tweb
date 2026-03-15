namespace LearnFlow.BusinessLayer.DTOs;

public class LessonDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string Difficulty { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int Students { get; set; }
    public string Instructor { get; set; } = string.Empty;
    public int Progress { get; set; }
    public string Thumbnail { get; set; } = string.Empty;
    public bool Locked { get; set; }
    public string? VideoUrl { get; set; }
}

public class CreateLessonDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string Difficulty { get; set; } = "Beginner";
    public string Duration { get; set; } = "30 min";
    public string InstructorName { get; set; } = string.Empty;
    public string Thumbnail { get; set; } = "DF";
    public string? VideoUrl { get; set; }
    public bool IsLocked { get; set; } = false;
}

public class UpdateLessonDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? CategoryId { get; set; }
    public string? Difficulty { get; set; }
    public string? Duration { get; set; }
    public string? InstructorName { get; set; }
    public string? Thumbnail { get; set; }
    public string? VideoUrl { get; set; }
    public bool? IsLocked { get; set; }
}
