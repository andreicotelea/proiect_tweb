using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class LessonActionExecution : Core.LessonActions, ILessonService
    {
        public List<LessonDto> GetAll(string? category, string? difficulty, string? search) => GetAllActionExecution(category, difficulty, search);
        public LessonDto? GetById(int id) => GetByIdActionExecution(id);
        public ActionResponse Create(CreateLessonDto dto) => CreateActionExecution(dto);
        public ActionResponse Update(int id, UpdateLessonDto dto) => UpdateActionExecution(id, dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
