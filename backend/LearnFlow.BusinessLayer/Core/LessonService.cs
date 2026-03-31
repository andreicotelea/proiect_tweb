using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Lesson;

namespace LearnFlow.BusinessLayer.Core
{
    public class LessonService : Interfaces.ILessonService
    {
        public List<LessonDto> GetAll(string? category, string? difficulty, string? search)
        {
            using var context = new LessonContext();
            var query = context.Lessons.Include(l => l.Category).AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(l => l.Category.Name == category);
            if (!string.IsNullOrEmpty(difficulty))
                query = query.Where(l => l.Difficulty == difficulty);
            if (!string.IsNullOrEmpty(search))
                query = query.Where(l => l.Title.Contains(search));

            return query.Select(l => MapToDto(l)).ToList();
        }

        public LessonDto? GetById(int id)
        {
            using var context = new LessonContext();
            var lesson = context.Lessons.Include(l => l.Category).FirstOrDefault(l => l.Id == id);
            return lesson == null ? null : MapToDto(lesson);
        }

        public ActionResponse Create(CreateLessonDto dto)
        {
            using var context = new LessonContext();
            var lesson = new LessonData
            {
                Title = dto.Title,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                Difficulty = dto.Difficulty,
                Duration = dto.Duration,
                InstructorName = dto.InstructorName,
                Thumbnail = dto.Thumbnail,
                VideoUrl = dto.VideoUrl,
                IsLocked = dto.IsLocked,
                CreatedAt = DateTime.UtcNow,
            };
            context.Lessons.Add(lesson);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Lectie creata cu succes." };
        }

        public ActionResponse Update(int id, UpdateLessonDto dto)
        {
            using var context = new LessonContext();
            var lesson = context.Lessons.FirstOrDefault(l => l.Id == id);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };

            if (dto.Title != null) lesson.Title = dto.Title;
            if (dto.Description != null) lesson.Description = dto.Description;
            if (dto.CategoryId.HasValue) lesson.CategoryId = dto.CategoryId.Value;
            if (dto.Difficulty != null) lesson.Difficulty = dto.Difficulty;
            if (dto.Duration != null) lesson.Duration = dto.Duration;
            if (dto.InstructorName != null) lesson.InstructorName = dto.InstructorName;
            if (dto.Thumbnail != null) lesson.Thumbnail = dto.Thumbnail;
            if (dto.VideoUrl != null) lesson.VideoUrl = dto.VideoUrl;
            if (dto.IsLocked.HasValue) lesson.IsLocked = dto.IsLocked.Value;

            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Lectie actualizata." };
        }

        public ActionResponse Delete(int id)
        {
            using var context = new LessonContext();
            var lesson = context.Lessons.FirstOrDefault(l => l.Id == id);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };

            context.Lessons.Remove(lesson);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Lectie stearsa." };
        }

        private static LessonDto MapToDto(LessonData l) => new()
        {
            Id = l.Id,
            Title = l.Title,
            Description = l.Description,
            Category = l.Category?.Name ?? "",
            CategoryId = l.CategoryId,
            Difficulty = l.Difficulty,
            Duration = l.Duration,
            Rating = l.Rating,
            Students = l.StudentCount,
            Instructor = l.InstructorName,
            Thumbnail = l.Thumbnail,
            Locked = l.IsLocked,
            VideoUrl = l.VideoUrl,
        };
    }
}
