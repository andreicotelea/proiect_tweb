using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IUserService
{
    List<UserDto> GetAll();
    UserDto? GetById(int id);
    ActionResponse Update(int id, UserDto dto);
    ActionResponse Delete(int id);
    ActionResponse UpdateProfile(int id, UpdateUserProfileDto dto);
    ActionResponse ChangePassword(int id, ChangePasswordDto dto);
}
