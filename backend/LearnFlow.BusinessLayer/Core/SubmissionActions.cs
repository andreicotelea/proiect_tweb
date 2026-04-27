using LearnFlow.Domain.Models.Submission;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Submission;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class SubmissionActions
    {
        protected SubmissionActions() { }

        protected List<SubmissionDto> GetByUserActionExecution(int userId)
        {
            using var context = new AppDbContext();
            return context.Submissions
                .Where(s => s.UserId == userId)
                .Select(s => new SubmissionDto
                {
                    Id = s.Id,
                    UserId = s.UserId,
                    LessonId = s.LessonId,
                    Score = s.Score,
                    MaxScore = s.MaxScore,
                    SubmittedAt = s.SubmittedAt.ToString("yyyy-MM-dd HH:mm"),
                }).ToList();
        }

        protected List<SubmissionDto> GetByLessonActionExecution(int lessonId)
        {
            using var context = new AppDbContext();
            return context.Submissions
                .Where(s => s.LessonId == lessonId)
                .Select(s => new SubmissionDto
                {
                    Id = s.Id,
                    UserId = s.UserId,
                    LessonId = s.LessonId,
                    Score = s.Score,
                    MaxScore = s.MaxScore,
                    SubmittedAt = s.SubmittedAt.ToString("yyyy-MM-dd HH:mm"),
                }).ToList();
        }

        protected ActionResponse CreateActionExecution(CreateSubmissionDto dto)
        {
            using var context = new AppDbContext();
            var submission = new SubmissionData
            {
                UserId = dto.UserId,
                LessonId = dto.LessonId,
                Score = dto.Score,
                MaxScore = dto.MaxScore,
                SubmittedAt = DateTime.UtcNow,
            };
            context.Submissions.Add(submission);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Submisie inregistrata cu succes." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var submission = context.Submissions.FirstOrDefault(s => s.Id == id);
            if (submission == null)
                return new ActionResponse { IsSuccess = false, Message = "Submisia nu a fost gasita." };
            context.Submissions.Remove(submission);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Submisie stearsa." };
        }
    }
}
