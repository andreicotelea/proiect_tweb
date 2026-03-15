using LearnFlow.BusinessLayer.DTOs;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IAuthService
{
    Task<UserDto?> Login(string email, string password);
    Task<UserDto> Register(RegisterDto dto);
    Task Logout();
    Task<UserDto?> GetCurrentUser(int userId);
}
