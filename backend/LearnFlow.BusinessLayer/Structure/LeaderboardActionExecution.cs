using LearnFlow.Domain.Models.Leaderboard;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class LeaderboardActionExecution : Core.LeaderboardActions, ILeaderboardService
    {
        public List<LeaderboardEntryDto> GetLeaderboard() => GetLeaderboardActionExecution();
    }
}
