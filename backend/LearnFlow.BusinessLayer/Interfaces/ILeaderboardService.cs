using LearnFlow.Domain.Models.Leaderboard;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ILeaderboardService
{
    List<LeaderboardEntryDto> GetLeaderboard();
}
