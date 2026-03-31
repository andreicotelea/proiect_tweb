namespace LearnFlow.Domain.Models.Lesson
{
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
}
