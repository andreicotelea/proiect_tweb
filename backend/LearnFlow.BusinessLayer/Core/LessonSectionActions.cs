using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Lesson;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class LessonSectionActions
    {
        protected LessonSectionActions() { }

        protected List<LessonSectionDto> GetByLessonActionExecution(int lessonId)
        {
            using var context = new AppDbContext();
            return context.LessonSections
                .Where(s => s.LessonId == lessonId)
                .OrderBy(s => s.Order)
                .Select(s => new LessonSectionDto
                {
                    Id = s.Id,
                    LessonId = s.LessonId,
                    Title = s.Title,
                    Duration = s.Duration,
                    Order = s.Order,
                }).ToList();
        }

        protected ActionResponse CreateActionExecution(CreateLessonSectionDto dto)
        {
            using var context = new AppDbContext();
            var lesson = context.Lessons.FirstOrDefault(l => l.Id == dto.LessonId);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };

            var section = new LessonSectionData
            {
                LessonId = dto.LessonId,
                Title = dto.Title,
                Duration = dto.Duration,
                Order = dto.Order,
            };
            context.LessonSections.Add(section);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Sectiune creata cu succes." };
        }

        protected ActionResponse UpdateActionExecution(int id, CreateLessonSectionDto dto)
        {
            using var context = new AppDbContext();
            var section = context.LessonSections.FirstOrDefault(s => s.Id == id);
            if (section == null)
                return new ActionResponse { IsSuccess = false, Message = "Sectiunea nu a fost gasita." };

            section.Title = dto.Title;
            section.Duration = dto.Duration;
            section.Order = dto.Order;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Sectiune actualizata." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var section = context.LessonSections.FirstOrDefault(s => s.Id == id);
            if (section == null)
                return new ActionResponse { IsSuccess = false, Message = "Sectiunea nu a fost gasita." };

            context.LessonSections.Remove(section);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Sectiune stearsa." };
        }
    }
}
