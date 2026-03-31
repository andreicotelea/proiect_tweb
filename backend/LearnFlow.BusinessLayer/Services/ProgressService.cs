using Microsoft.EntityFrameworkCore;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;
using LearnFlow.Domain.Entities.Progress;
using LearnFlow.Domain.Models.Progress;

namespace LearnFlow.BusinessLayer.Services;

public class ProgressService : IProgressService
{
    private readonly AppDbContext _db;

    public ProgressService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<ProgressDto>> GetByUser(int userId)
    {
        var progress = await _db.UserProgress
            .Where(p => p.UserId == userId)
            .ToListAsync();

        return progress.Select(p => new ProgressDto
        {
            UserId = p.UserId,
            LessonId = p.LessonId,
            PercentComplete = p.PercentComplete,
            CompletedAt = p.CompletedAt?.ToString("yyyy-MM-dd"),
            LastAccessedAt = p.LastAccessedAt.ToString("yyyy-MM-dd"),
        }).ToList();
    }

    public async Task<ProgressDto> UpdateProgress(UpdateProgressDto dto)
    {
        var existing = await _db.UserProgress
            .FirstOrDefaultAsync(p => p.UserId == dto.UserId && p.LessonId == dto.LessonId);

        if (existing == null)
        {
            existing = new UserProgressData
            {
                UserId = dto.UserId,
                LessonId = dto.LessonId,
                PercentComplete = dto.Percent,
                LastAccessedAt = DateTime.UtcNow,
            };
            _db.UserProgress.Add(existing);
        }
        else
        {
            existing.PercentComplete = dto.Percent;
            existing.LastAccessedAt = DateTime.UtcNow;
        }

        if (dto.Percent >= 100)
            existing.CompletedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return new ProgressDto
        {
            UserId = existing.UserId,
            LessonId = existing.LessonId,
            PercentComplete = existing.PercentComplete,
            CompletedAt = existing.CompletedAt?.ToString("yyyy-MM-dd"),
            LastAccessedAt = existing.LastAccessedAt.ToString("yyyy-MM-dd"),
        };
    }
}
