using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Settings;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class AuthActions
    {
        protected AuthActions() { }

        protected LoginResponseDto? LoginActionExecution(UserLoginDto dto)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;
            var token = GenerateToken(user);
            return new LoginResponseDto { Token = token, User = MapToDto(user) };
        }

        protected ActionResponse RegisterActionExecution(UserRegisterDto dto)
        {
            using var context = new UserContext();
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

        protected UserDto? GetByIdActionExecution(int id)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            return user == null ? null : MapToDto(user);
        }

        private string GenerateToken(UserData user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Key));
            var token = new JwtSecurityToken(
                issuer: JwtSettings.Issuer,
                audience: JwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(JwtSettings.ExpireMinutes),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
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
