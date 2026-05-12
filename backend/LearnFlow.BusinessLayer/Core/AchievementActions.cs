using LearnFlow.Domain.Models.Achievement;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Achievement;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class AchievementActions
    {
        protected AchievementActions() { }

        protected List<AchievementDto> GetAllActionExecution()
        {
            using var context = new AppDbContext();
            return context.Achievements.Select(a => new AchievementDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                Icon = a.Icon,
                Condition = a.Condition,
            }).ToList();
        }

        protected AchievementDto? GetByIdActionExecution(int id)
        {
            using var context = new AppDbContext();
            var achievement = context.Achievements.FirstOrDefault(a => a.Id == id);
            if (achievement == null) return null;
            return new AchievementDto
            {
                Id = achievement.Id,
                Title = achievement.Title,
                Description = achievement.Description,
                Icon = achievement.Icon,
                Condition = achievement.Condition,
            };
        }

        protected ActionResponse CreateActionExecution(CreateAchievementDto dto)
        {
            using var context = new AppDbContext();
            var achievement = new AchievementData
            {
                Title = dto.Title,
                Description = dto.Description,
                Icon = dto.Icon,
                Condition = dto.Condition,
            };
            context.Achievements.Add(achievement);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Achievement creat cu succes." };
        }

        protected ActionResponse UpdateActionExecution(int id, CreateAchievementDto dto)
        {
            using var context = new AppDbContext();
            var achievement = context.Achievements.FirstOrDefault(a => a.Id == id);
            if (achievement == null)
                return new ActionResponse { IsSuccess = false, Message = "Achievement-ul nu a fost gasit." };
            achievement.Title = dto.Title;
            achievement.Description = dto.Description;
            achievement.Icon = dto.Icon;
            achievement.Condition = dto.Condition;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Achievement actualizat." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var achievement = context.Achievements.FirstOrDefault(a => a.Id == id);
            if (achievement == null)
                return new ActionResponse { IsSuccess = false, Message = "Achievement-ul nu a fost gasit." };
            context.Achievements.Remove(achievement);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Achievement sters." };
        }
    }
}
