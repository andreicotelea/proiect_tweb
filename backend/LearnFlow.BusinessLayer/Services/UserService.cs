using Microsoft.EntityFrameworkCore;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;
using LearnFlow.Domain.Models.User;

namespace LearnFlow.BusinessLayer.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<UserDto>> GetAll()
    {
        var users = await _db.Users.ToListAsync();
        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            Role = u.Role,
            Avatar = u.Avatar,
            CreatedAt = u.CreatedAt.ToString("yyyy-MM-dd"),
        }).ToList();
    }

    public async Task<UserDto?> GetById(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return null;

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Avatar = user.Avatar,
            CreatedAt = user.CreatedAt.ToString("yyyy-MM-dd"),
        };
    }

    public async Task<UserDto?> Update(int id, UserDto dto)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return null;

        user.Name = dto.Name;
        user.Email = dto.Email;
        user.Role = dto.Role;
        user.Avatar = dto.Avatar;

        await _db.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Role = user.Role,
            Avatar = user.Avatar,
            CreatedAt = user.CreatedAt.ToString("yyyy-MM-dd"),
        };
    }

    public async Task<bool> Delete(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return false;

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return true;
    }
}
