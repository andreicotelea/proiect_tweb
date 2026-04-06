using LearnFlow.Domain.Models.User;

namespace LearnFlow.Domain.Models.Responses
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UserDto User { get; set; }
    }
}
