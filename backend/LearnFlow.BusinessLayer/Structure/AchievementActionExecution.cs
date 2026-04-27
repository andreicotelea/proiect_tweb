using LearnFlow.Domain.Models.Achievement;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class AchievementActionExecution : Core.AchievementActions, IAchievementService
    {
        public List<AchievementDto> GetAll() => GetAllActionExecution();
        public AchievementDto? GetById(int id) => GetByIdActionExecution(id);
        public ActionResponse Create(CreateAchievementDto dto) => CreateActionExecution(dto);
        public ActionResponse Update(int id, CreateAchievementDto dto) => UpdateActionExecution(id, dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
