using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using Microsoft.EntityFrameworkCore;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class UserActions
    {
        protected UserActions() { }

        protected List<UserDto> GetAllActionExecution()
        {
            using var context = new UserContext();
            return context.Users.Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role,
                Avatar = u.Avatar,
                CreatedAt = u.CreatedAt.ToString("yyyy-MM-dd"),
            }).ToList();
        }

        protected UserDto? GetByIdActionExecution(int id)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return null;
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Avatar = user.Avatar,
                CreatedAt = user.CreatedAt.ToString("yyyy-MM-dd"),
            };
        }

        protected ActionResponse UpdateActionExecution(int id, UserDto dto)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };
            user.Name = dto.Name;
            user.Email = dto.Email;
            user.Role = dto.Role;
            user.Avatar = dto.Avatar;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Utilizator actualizat." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };
            context.Users.Remove(user);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Utilizator sters." };
        }

        protected UserDashboardStatsDto GetDashboardStatsActionExecution(int userId)
        {
            using var progressContext = new ProgressContext();
            using var userContext = new UserContext();
            using var achievementContext = new AchievementContext();

            var progress = progressContext.UserProgress.Where(p => p.UserId == userId).ToList();
            var completed = progress.Count(p => p.PercentComplete >= 100);
            var inProgress = progress.Count(p => p.PercentComplete > 0 && p.PercentComplete < 100);
            var totalPoints = progress.Sum(p => p.PercentComplete) * 10;

            var allUsers = userContext.Users.Where(u => u.Role == "student").ToList();
            var allProgress = progressContext.UserProgress.ToList();
            var rankings = allUsers
                .Select(u => new { u.Id, Points = allProgress.Where(p => p.UserId == u.Id).Sum(p => p.PercentComplete) * 10 })
                .OrderByDescending(x => x.Points).ToList();
            var rank = rankings.FindIndex(x => x.Id == userId) + 1;
            if (rank == 0) rank = rankings.Count + 1;

            var achievements = achievementContext.UserAchievements.Count(a => a.UserId == userId);

            return new UserDashboardStatsDto
            {
                CompletedLessons = completed,
                InProgressLessons = inProgress,
                TotalPoints = totalPoints,
                Streak = completed,
                Rank = rank,
                TotalAchievements = achievements,
            };
        }
    }
}
