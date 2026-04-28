using LearnFlow.Domain.Models.Progress;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Progress;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class ProgressActions
    {
        protected ProgressActions() { }

        protected List<ProgressDto> GetByUserActionExecution(int userId)
        {
            using var context = new AppDbContext();
            return context.UserProgress
                .Where(p => p.UserId == userId)
                .Select(p => new ProgressDto
                {
                    UserId = p.UserId,
                    LessonId = p.LessonId,
                    PercentComplete = p.PercentComplete,
                    CompletedAt = p.CompletedAt.HasValue ? p.CompletedAt.Value.ToString("yyyy-MM-dd") : null,
                    LastAccessedAt = p.LastAccessedAt.ToString("yyyy-MM-dd"),
                }).ToList();
        }

        protected ActionResponse UpdateProgressActionExecution(UpdateProgressDto dto)
        {
            using var context = new AppDbContext();
            var existing = context.UserProgress
                .FirstOrDefault(p => p.UserId == dto.UserId && p.LessonId == dto.LessonId);
            if (existing == null)
            {
                existing = new UserProgressData
                {
                    UserId = dto.UserId,
                    LessonId = dto.LessonId,
                    PercentComplete = dto.Percent,
                    LastAccessedAt = DateTime.UtcNow,
                };
                context.UserProgress.Add(existing);
            }
            else
            {
                existing.PercentComplete = dto.Percent;
                existing.LastAccessedAt = DateTime.UtcNow;
            }
            if (dto.Percent >= 100)
                existing.CompletedAt = DateTime.UtcNow;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Progres actualizat." };
        }

        protected ActionResponse EnrollActionExecution(int userId, int lessonId)
        {
            using var context = new AppDbContext();
            var existing = context.UserProgress.FirstOrDefault(p => p.UserId == userId && p.LessonId == lessonId);
            if (existing != null)
                return new ActionResponse { IsSuccess = false, Message = "Esti deja inrolat in aceasta lectie." };

            var lesson = context.Lessons.FirstOrDefault(l => l.Id == lessonId);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };

            var progress = new UserProgressData
            {
                UserId = userId,
                LessonId = lessonId,
                PercentComplete = 0,
                LastAccessedAt = DateTime.UtcNow,
            };
            context.UserProgress.Add(progress);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Te-ai inrolat cu succes." };
        }
    }
}
