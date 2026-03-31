namespace LearnFlow.Domain.Models.Lesson
{
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
}
