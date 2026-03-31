using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;

namespace LearnFlow.BusinessLayer.Core
{
    public class UserService : Interfaces.IUserService
    {
        public List<UserDto> GetAll()
        {
            using var context = new UserContext();
            return context.Users.Select(u => new UserDto
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role,
                Avatar = u.Avatar,
                CreatedAt = u.CreatedAt.ToString("yyyy-MM-dd"),
            }).ToList();
        }

        public UserDto? GetById(int id)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
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

        public ActionResponse Update(int id, UserDto dto)
        {
            using var context = new UserContext();
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

        public ActionResponse Delete(int id)
        {
            using var context = new UserContext();
            var user = context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return new ActionResponse { IsSuccess = false, Message = "Utilizatorul nu a fost gasit." };

            context.Users.Remove(user);
            context.SaveChanges();

            return new ActionResponse { IsSuccess = true, Message = "Utilizator sters." };
        }
    }
}
