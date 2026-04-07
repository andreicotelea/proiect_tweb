using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class UserActionExecution : Core.UserActions, IUserService
    {
        public List<UserDto> GetAll() => GetAllActionExecution();
        public UserDto? GetById(int id) => GetByIdActionExecution(id);
        public ActionResponse Update(int id, UserDto dto) => UpdateActionExecution(id, dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
