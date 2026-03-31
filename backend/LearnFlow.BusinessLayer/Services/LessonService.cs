using Microsoft.EntityFrameworkCore;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;
using LearnFlow.Domain.Entities.Lesson;
using LearnFlow.Domain.Models.Lesson;

namespace LearnFlow.BusinessLayer.Services;

public class LessonService : ILessonService
{
    private readonly AppDbContext _db;

    public LessonService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<LessonDto>> GetAll(string? category, string? difficulty, string? search)
    {
        var query = _db.Lessons.Include(l => l.Category).AsQueryable();

        if (!string.IsNullOrEmpty(category))
            query = query.Where(l => l.Category.Name == category);

        if (!string.IsNullOrEmpty(difficulty))
            query = query.Where(l => l.Difficulty == difficulty);

        if (!string.IsNullOrEmpty(search))
            query = query.Where(l => l.Title.Contains(search));

        var lessons = await query.ToListAsync();
        return lessons.Select(MapToDto).ToList();
    }

    public async Task<LessonDto?> GetById(int id)
    {
        var lesson = await _db.Lessons.Include(l => l.Category).FirstOrDefaultAsync(l => l.Id == id);
        return lesson == null ? null : MapToDto(lesson);
    }

    public async Task<LessonDto> Create(CreateLessonDto dto)
    {
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
            CreatedAt = DateTime.UtcNow
        };

        _db.Lessons.Add(lesson);
        await _db.SaveChangesAsync();

        await _db.Entry(lesson).Reference(l => l.Category).LoadAsync();
        return MapToDto(lesson);
    }

    public async Task<LessonDto?> Update(int id, UpdateLessonDto dto)
    {
        var lesson = await _db.Lessons.Include(l => l.Category).FirstOrDefaultAsync(l => l.Id == id);
        if (lesson == null) return null;

        if (dto.Title != null) lesson.Title = dto.Title;
        if (dto.Description != null) lesson.Description = dto.Description;
        if (dto.CategoryId.HasValue) lesson.CategoryId = dto.CategoryId.Value;
        if (dto.Difficulty != null) lesson.Difficulty = dto.Difficulty;
        if (dto.Duration != null) lesson.Duration = dto.Duration;
        if (dto.InstructorName != null) lesson.InstructorName = dto.InstructorName;
        if (dto.Thumbnail != null) lesson.Thumbnail = dto.Thumbnail;
        if (dto.VideoUrl != null) lesson.VideoUrl = dto.VideoUrl;
        if (dto.IsLocked.HasValue) lesson.IsLocked = dto.IsLocked.Value;

        await _db.SaveChangesAsync();
        return MapToDto(lesson);
    }

    public async Task<bool> Delete(int id)
    {
        var lesson = await _db.Lessons.FindAsync(id);
        if (lesson == null) return false;

        _db.Lessons.Remove(lesson);
        await _db.SaveChangesAsync();
        return true;
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
