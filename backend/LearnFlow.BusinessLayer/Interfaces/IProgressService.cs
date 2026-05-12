using LearnFlow.Domain.Models.Progress;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IProgressService
{
    List<ProgressDto> GetByUser(int userId);
    ActionResponse UpdateProgress(UpdateProgressDto dto);
    ActionResponse Enroll(int userId, int lessonId);
}
