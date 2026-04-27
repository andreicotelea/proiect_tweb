namespace LearnFlow.Domain.Models.Lesson
{
    public class LessonSectionDto
    {
        public int Id { get; set; }
        public int LessonId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
