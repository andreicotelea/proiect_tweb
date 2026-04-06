using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.User;

namespace LearnFlow.BusinessLayer.Core
{
    public class AuthService : Interfaces.IAuthService
    {
        public UserDto? Login(string email, string password)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null) return null;

            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return null;

            return MapToDto(user);
        }

        public ActionResponse Register(UserRegisterDto dto)
        {
            using var context = new AppDbContext();

            if (context.Users.Any(u => u.Email == dto.Email))
                return new ActionResponse { IsSuccess = false, Message = "Un cont cu acest email exista deja." };

            var user = new UserData
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "student",
                CreatedAt = DateTime.UtcNow,
            };

            context.Users.Add(user);
            context.SaveChanges();

            return new ActionResponse { IsSuccess = true, Message = "Inregistrare reusita." };
        }

        public UserDto? GetById(int id)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            return user == null ? null : MapToDto(user);
        }

        private static UserDto MapToDto(UserData user) => new()
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Avatar = user.Avatar,
            CreatedAt = user.CreatedAt.ToString("yyyy-MM-dd"),
        };
    }
}
