namespace LearnFlow.Domain.Models.Progress
{
    public class UpdateProgressDto
    {
        public int UserId { get; set; }
        public int LessonId { get; set; }
        public int Percent { get; set; }
    }
}
