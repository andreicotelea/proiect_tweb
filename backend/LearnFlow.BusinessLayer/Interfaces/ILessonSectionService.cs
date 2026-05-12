using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ILessonSectionService
{
    List<LessonSectionDto> GetByLesson(int lessonId);
    ActionResponse Create(CreateLessonSectionDto dto);
    ActionResponse Update(int id, CreateLessonSectionDto dto);
    ActionResponse Delete(int id);
}
