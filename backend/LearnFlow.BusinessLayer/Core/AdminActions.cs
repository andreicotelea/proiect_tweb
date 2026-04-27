using LearnFlow.Domain.Models.Admin;
using LearnFlow.DataAccessLayer.Context;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class AdminActions
    {
        protected AdminActions() { }

        protected AdminStatsDto GetStatsActionExecution()
        {
            using var context = new AppDbContext();

            var totalUsers = context.Users.Count();
            var totalLessons = context.Lessons.Count();
            var totalCategories = context.Categories.Count();
            var avgRating = context.Lessons.Any() ? context.Lessons.Average(l => l.Rating) : 0;
            var completedCount = context.UserProgress.Count(p => p.PercentComplete >= 100);
            var totalProgress = context.UserProgress.Count();
            var completionRate = totalProgress > 0 ? (completedCount * 100) / totalProgress : 0;

            return new AdminStatsDto
            {
                TotalUsers = totalUsers,
                ActiveUsers = context.UserProgress.Select(p => p.UserId).Distinct().Count(),
                TotalLessons = totalLessons,
                TotalCategories = totalCategories,
                AvgRating = Math.Round(avgRating, 1),
                CompletionRate = completionRate,
            };
        }
    }
}
