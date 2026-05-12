namespace LearnFlow.Domain.Models.Submission
{
    public class SubmissionDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LessonId { get; set; }
        public int Score { get; set; }
        public int MaxScore { get; set; }
        public string SubmittedAt { get; set; } = string.Empty;
    }
}
