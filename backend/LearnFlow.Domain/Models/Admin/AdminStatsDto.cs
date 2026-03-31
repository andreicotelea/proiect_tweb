namespace LearnFlow.Domain.Models.Admin
{
    public class AdminStatsDto
    {
        public int TotalUsers { get; set; }
        public int ActiveUsers { get; set; }
        public int TotalLessons { get; set; }
        public int TotalCategories { get; set; }
        public double AvgRating { get; set; }
        public int CompletionRate { get; set; }
    }
}
