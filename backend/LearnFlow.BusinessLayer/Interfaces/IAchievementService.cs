using LearnFlow.Domain.Models.Achievement;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IAchievementService
{
    List<AchievementDto> GetAll();
    AchievementDto? GetById(int id);
    ActionResponse Create(CreateAchievementDto dto);
    ActionResponse Update(int id, CreateAchievementDto dto);
    ActionResponse Delete(int id);
}
