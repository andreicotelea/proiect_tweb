using LearnFlow.Domain.Models.User;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IAuthService
{
    Task<UserDto?> Login(string email, string password);
    Task<UserDto> Register(UserRegisterDto dto);
    Task Logout();
    Task<UserDto?> GetCurrentUser(int userId);
}
