using Microsoft.EntityFrameworkCore;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Models.User;

namespace LearnFlow.BusinessLayer.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;

    public AuthService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<UserDto?> Login(string email, string password)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null) return null;

        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            return null;

        return MapToDto(user);
    }

    public async Task<UserDto> Register(UserRegisterDto dto)
    {
        var user = new UserData
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "student",
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return MapToDto(user);
    }

    public Task Logout()
    {
        return Task.CompletedTask;
    }

    public async Task<UserDto?> GetCurrentUser(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
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
