using LearnFlow.BusinessLayer.DTOs;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ILeaderboardService
{
    Task<List<LeaderboardEntryDto>> GetLeaderboard();
}
