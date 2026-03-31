using Microsoft.EntityFrameworkCore;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;
using LearnFlow.Domain.Models.Leaderboard;

namespace LearnFlow.BusinessLayer.Services;

public class LeaderboardService : ILeaderboardService
{
    private readonly AppDbContext _db;

    public LeaderboardService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LeaderboardEntryDto>> GetLeaderboard()
    {
        var users = await _db.Users
            .Include(u => u.Progress)
            .Where(u => u.Role == "student")
            .ToListAsync();

        var leaderboard = users
            .Select(u => new
            {
                User = u,
                CompletedLessons = u.Progress.Count(p => p.PercentComplete >= 100),
                Points = u.Progress.Sum(p => p.PercentComplete) * 10,
            })
            .OrderByDescending(x => x.Points)
            .Select((x, i) => new LeaderboardEntryDto
            {
                Rank = i + 1,
                Name = x.User.Name,
                Points = x.Points,
                Lessons = x.CompletedLessons,
                Streak = 0,
                Avatar = x.User.Avatar,
            })
            .ToList();

        return leaderboard;
    }
}
