using LearnFlow.Domain.Models.Progress;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Progress;
using LearnFlow.Domain.Entities.Achievement;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class ProgressActions
    {
        protected ProgressActions() { }

        protected List<ProgressDto> GetByUserActionExecution(int userId)
        {
            using var context = new ProgressContext();
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
            using var context = new ProgressContext();
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
            using var progressContext = new ProgressContext();
            using var lessonContext = new LessonContext();
            using var achievementContext = new AchievementContext();

            var existing = progressContext.UserProgress
                .FirstOrDefault(p => p.UserId == userId && p.LessonId == lessonId);
            if (existing != null)
                return new ActionResponse { IsSuccess = false, Message = "Esti deja inrolat la aceasta lectie." };

            var lesson = lessonContext.Lessons.FirstOrDefault(l => l.Id == lessonId);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };

            progressContext.UserProgress.Add(new UserProgressData
            {
                UserId = userId,
                LessonId = lessonId,
                PercentComplete = 0,
                LastAccessedAt = DateTime.UtcNow,
            });
            progressContext.SaveChanges();

            // Auto-award "Prima Lectie" achievement
            var totalEnrollments = progressContext.UserProgress.Count(p => p.UserId == userId);
            if (totalEnrollments == 1)
            {
                var firstLessonAchievement = achievementContext.Achievements.FirstOrDefault(a => a.Condition == "first_enrollment");
                if (firstLessonAchievement != null)
                {
                    var alreadyAwarded = achievementContext.UserAchievements.Any(ua => ua.UserId == userId && ua.AchievementId == firstLessonAchievement.Id);
                    if (!alreadyAwarded)
                    {
                        achievementContext.UserAchievements.Add(new UserAchievementData
                        {
                            UserId = userId,
                            AchievementId = firstLessonAchievement.Id,
                            EarnedAt = DateTime.UtcNow,
                        });
                        achievementContext.SaveChanges();
                    }
                }
            }

            return new ActionResponse { IsSuccess = true, Message = "Inrolare reusita." };
        }
    }
}
