using LearnFlow.Domain.Models.Lesson;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ILessonService
{
    Task<List<LessonDto>> GetAll(string? category, string? difficulty, string? search);
    Task<LessonDto?> GetById(int id);
    Task<LessonDto> Create(CreateLessonDto dto);
    Task<LessonDto?> Update(int id, UpdateLessonDto dto);
    Task<bool> Delete(int id);
}
