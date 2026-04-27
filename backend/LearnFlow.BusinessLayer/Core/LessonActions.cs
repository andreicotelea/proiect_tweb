using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Lesson;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class LessonActions
    {
        protected LessonActions() { }

        protected List<LessonDto> GetAllActionExecution(string? category, string? difficulty, string? search)
        {
            using var context = new AppDbContext();
            var query = context.Lessons.Include(l => l.Category).AsQueryable();
            if (!string.IsNullOrEmpty(category))
                query = query.Where(l => l.Category.Name == category);
            if (!string.IsNullOrEmpty(difficulty))
                query = query.Where(l => l.Difficulty == difficulty);
            if (!string.IsNullOrEmpty(search))
                query = query.Where(l => l.Title.Contains(search));
            return query.Select(l => MapToDto(l)).ToList();
        }

        protected LessonDto? GetByIdActionExecution(int id)
        {
            using var context = new AppDbContext();
            var lesson = context.Lessons.Include(l => l.Category).FirstOrDefault(l => l.Id == id);
            return lesson == null ? null : MapToDto(lesson);
        }

        protected ActionResponse CreateActionExecution(CreateLessonDto dto)
        {
            using var context = new AppDbContext();
            var lesson = new LessonData
            {
                Title = dto.Title,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                Difficulty = dto.Difficulty,
                Duration = dto.Duration,
                ProfesorName = dto.ProfesorName,
                Thumbnail = dto.Thumbnail,
                VideoUrl = dto.VideoUrl,
                IsLocked = dto.IsLocked,
                CreatedAt = DateTime.UtcNow,
            };
            context.Lessons.Add(lesson);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Lectie creata cu succes." };
        }

        protected ActionResponse UpdateActionExecution(int id, UpdateLessonDto dto)
        {
            using var context = new AppDbContext();
            var lesson = context.Lessons.FirstOrDefault(l => l.Id == id);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };
            if (dto.Title != null) lesson.Title = dto.Title;
            if (dto.Description != null) lesson.Description = dto.Description;
            if (dto.CategoryId.HasValue) lesson.CategoryId = dto.CategoryId.Value;
            if (dto.Difficulty != null) lesson.Difficulty = dto.Difficulty;
            if (dto.Duration != null) lesson.Duration = dto.Duration;
            if (dto.ProfesorName != null) lesson.ProfesorName = dto.ProfesorName;
            if (dto.Thumbnail != null) lesson.Thumbnail = dto.Thumbnail;
            if (dto.VideoUrl != null) lesson.VideoUrl = dto.VideoUrl;
            if (dto.IsLocked.HasValue) lesson.IsLocked = dto.IsLocked.Value;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Lectie actualizata." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var lesson = context.Lessons.FirstOrDefault(l => l.Id == id);
            if (lesson == null)
                return new ActionResponse { IsSuccess = false, Message = "Lectia nu a fost gasita." };
            context.Lessons.Remove(lesson);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Lectie stearsa." };
        }

        protected PaginatedResponse<LessonDto> GetAllPaginatedActionExecution(string? category, string? difficulty, string? search, int page, int pageSize)
        {
            using var context = new AppDbContext();
            var query = context.Lessons.Include(l => l.Category).AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(l => l.Category.Name == category);
            if (!string.IsNullOrEmpty(difficulty))
                query = query.Where(l => l.Difficulty == difficulty);
            if (!string.IsNullOrEmpty(search))
                query = query.Where(l => l.Title.Contains(search));

            var total = query.Count();
            var items = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(l => MapToDto(l))
                .ToList();

            return new PaginatedResponse<LessonDto>
            {
                Data = items,
                Total = total,
                Page = page,
                PageSize = pageSize,
            };
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
            Profesor = l.ProfesorName,
            Thumbnail = l.Thumbnail,
            Locked = l.IsLocked,
            VideoUrl = l.VideoUrl,
        };
    }
}
