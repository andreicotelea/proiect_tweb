using LearnFlow.Domain.Models.Submission;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ISubmissionService
{
    List<SubmissionDto> GetByUser(int userId);
    List<SubmissionDto> GetByLesson(int lessonId);
    ActionResponse Create(CreateSubmissionDto dto);
    ActionResponse Delete(int id);
}
