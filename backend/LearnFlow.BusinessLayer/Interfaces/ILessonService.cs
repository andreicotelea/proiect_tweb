using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ILessonService
{
    List<LessonDto> GetAll(string? category, string? difficulty, string? search);
    LessonDto? GetById(int id);
    ActionResponse Create(CreateLessonDto dto);
    ActionResponse Update(int id, UpdateLessonDto dto);
    ActionResponse Delete(int id);
}
