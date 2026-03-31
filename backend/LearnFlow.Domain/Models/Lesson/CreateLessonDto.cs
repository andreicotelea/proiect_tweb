namespace LearnFlow.Domain.Models.Lesson
{
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
}
