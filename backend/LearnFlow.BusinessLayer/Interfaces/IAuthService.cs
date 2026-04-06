using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IAuthService
{
    LoginResponseDto? Login(UserLoginDto dto);
    ActionResponse Register(UserRegisterDto dto);
    UserDto? GetById(int id);
}
