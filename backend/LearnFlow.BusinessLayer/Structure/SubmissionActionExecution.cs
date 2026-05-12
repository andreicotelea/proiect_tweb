using LearnFlow.Domain.Models.Submission;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class SubmissionActionExecution : Core.SubmissionActions, ISubmissionService
    {
        public List<SubmissionDto> GetByUser(int userId) => GetByUserActionExecution(userId);
        public List<SubmissionDto> GetByLesson(int lessonId) => GetByLessonActionExecution(lessonId);
        public ActionResponse Create(CreateSubmissionDto dto) => CreateActionExecution(dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
