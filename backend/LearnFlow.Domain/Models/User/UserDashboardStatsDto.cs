namespace LearnFlow.Domain.Models.User
{
    public class UserDashboardStatsDto
    {
        public int CompletedLessons { get; set; }
        public int InProgressLessons { get; set; }
        public int TotalPoints { get; set; }
        public int Streak { get; set; }
        public int Rank { get; set; }
        public int TotalAchievements { get; set; }
    }
}
