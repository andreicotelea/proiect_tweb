using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class AuthActionExecution : Core.AuthActions, IAuthService
    {
        public LoginResponseDto? Login(UserLoginDto dto) => LoginActionExecution(dto);
        public ActionResponse Register(UserRegisterDto dto) => RegisterActionExecution(dto);
        public UserDto? GetById(int id) => GetByIdActionExecution(id);
    }
}
