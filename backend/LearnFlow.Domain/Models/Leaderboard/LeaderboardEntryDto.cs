namespace LearnFlow.Domain.Models.Leaderboard
{
    public class LeaderboardEntryDto
    {
        public int Rank { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Points { get; set; }
        public int Lessons { get; set; }
        public int Streak { get; set; }
        public string Avatar { get; set; } = string.Empty;
    }
}
