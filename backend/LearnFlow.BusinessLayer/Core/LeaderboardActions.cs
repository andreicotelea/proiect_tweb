using LearnFlow.Domain.Models.Leaderboard;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class LeaderboardActions
    {
        protected LeaderboardActions() { }

        protected List<LeaderboardEntryDto> GetLeaderboardActionExecution()
        {
            using var context = new AppDbContext();

            var users = context.Users.ToList();
            var allProgress = context.UserProgress.ToList();

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

        protected PaginatedResponse<LeaderboardEntryDto> GetLeaderboardPaginatedActionExecution(int page, int pageSize)
        {
            using var context = new AppDbContext();

            var users = context.Users.ToList();
            var allProgress = context.UserProgress.ToList();

            var entries = users
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
                .ToList();

            var total = entries.Count;
            var paged = entries
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select((x, i) => new LeaderboardEntryDto
                {
                    Rank = (page - 1) * pageSize + i + 1,
                    Name = x.User.Name,
                    Points = x.Points,
                    Lessons = x.CompletedLessons,
                    Streak = 0,
                    Avatar = x.User.Avatar,
                })
                .ToList();

            return new PaginatedResponse<LeaderboardEntryDto>
            {
                Data = paged,
                Total = total,
                Page = page,
                PageSize = pageSize,
            };
        }
    }
}
