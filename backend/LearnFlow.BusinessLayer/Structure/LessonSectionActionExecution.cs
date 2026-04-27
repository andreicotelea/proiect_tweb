using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class LessonSectionActionExecution : Core.LessonSectionActions, ILessonSectionService
    {
        public List<LessonSectionDto> GetByLesson(int lessonId) => GetByLessonActionExecution(lessonId);
        public ActionResponse Create(CreateLessonSectionDto dto) => CreateActionExecution(dto);
        public ActionResponse Update(int id, CreateLessonSectionDto dto) => UpdateActionExecution(id, dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
