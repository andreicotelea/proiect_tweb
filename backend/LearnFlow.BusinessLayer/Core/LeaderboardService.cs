using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Models.Leaderboard;
using LearnFlow.DataAccessLayer.Context;

namespace LearnFlow.BusinessLayer.Core
{
    public class LeaderboardService : Interfaces.ILeaderboardService
    {
        public List<LeaderboardEntryDto> GetLeaderboard()
        {
            using var context = new UserContext();
            var users = context.Users.ToList();

            using var progressContext = new ProgressContext();
            var allProgress = progressContext.UserProgress.ToList();

            return users
                .Where(u => u.Role == "student")
                .Select(u =>
                {
                    var userProgress = allProgress.Where(p => p.UserId == u.Id).ToList();
                    return new
                    {
                        User = u,
                        CompletedLessons = userProgress.Count(p => p.PercentComplete >= 100),
                        Points = userProgress.Sum(p => p.PercentComplete) * 10,
                    };
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
        }
    }
}
