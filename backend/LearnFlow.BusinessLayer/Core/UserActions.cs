using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;

namespace LearnFlow.BusinessLayer.Core
{
    public abstract class UserActions
    {
        protected UserActions() { }

        protected List<UserDto> GetAllActionExecution()
        {
            using var context = new AppDbContext();
            var allProgress = context.UserProgress.ToList();

            return context.Users.Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role,
                Avatar = u.Avatar,
                CreatedAt = u.CreatedAt.ToString("yyyy-MM-dd"),
                TotalPoints = allProgress.Where(p => p.UserId == u.Id).Sum(p => p.PercentComplete) * 10,
                Streak = allProgress.Count(p => p.UserId == u.Id && p.PercentComplete >= 100),
            }).ToList();
        }

        protected UserDto? GetByIdActionExecution(int id)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return null;

            var userProgress = context.UserProgress.Where(p => p.UserId == id).ToList();

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role,
                Avatar = user.Avatar,
                CreatedAt = user.CreatedAt.ToString("yyyy-MM-dd"),
                TotalPoints = userProgress.Sum(p => p.PercentComplete) * 10,
                Streak = userProgress.Count(p => p.PercentComplete >= 100),
            };
        }

        protected ActionResponse UpdateActionExecution(int id, UserDto dto)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };
            user.Name = dto.Name;
            user.Email = dto.Email;
            user.Role = dto.Role;
            user.Avatar = dto.Avatar;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Utilizator actualizat." };
        }

        protected ActionResponse DeleteActionExecution(int id)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };
            context.Users.Remove(user);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Utilizator sters." };
        }

        protected ActionResponse UpdateProfileActionExecution(int id, UpdateUserProfileDto dto)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };

            if (context.Users.Any(u => u.Email == dto.Email && u.Id != id))
                return new ActionResponse { IsSuccess = false, Message = "Acest email este deja utilizat." };

            user.Name = dto.Name;
            user.Email = dto.Email;
            user.Avatar = dto.Avatar;
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Profil actualizat cu succes." };
        }

        protected ActionResponse ChangePasswordActionExecution(int id, ChangePasswordDto dto)
        {
            using var context = new AppDbContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                return new ActionResponse { IsSuccess = false, Message = "Parola curenta este incorecta." };

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Parola a fost schimbata cu succes." };
        }
    }
}
