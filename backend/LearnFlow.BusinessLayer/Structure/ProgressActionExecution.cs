using LearnFlow.Domain.Models.Progress;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class ProgressActionExecution : Core.ProgressActions, IProgressService
    {
        public List<ProgressDto> GetByUser(int userId) => GetByUserActionExecution(userId);
        public ActionResponse UpdateProgress(UpdateProgressDto dto) => UpdateProgressActionExecution(dto);
    }
}
