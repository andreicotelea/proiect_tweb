using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IAuthService
{
    UserDto? Login(string email, string password);
    ActionResponse Register(UserRegisterDto dto);
    UserDto? GetById(int id);
}
