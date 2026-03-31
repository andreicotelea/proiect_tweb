using LearnFlow.Domain.Models.Leaderboard;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ILeaderboardService
{
    Task<List<LeaderboardEntryDto>> GetLeaderboard();
}
