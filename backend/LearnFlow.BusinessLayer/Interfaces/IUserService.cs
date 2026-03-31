using LearnFlow.Domain.Models.User;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IUserService
{
    Task<List<UserDto>> GetAll();
    Task<UserDto?> GetById(int id);
    Task<UserDto?> Update(int id, UserDto dto);
    Task<bool> Delete(int id);
}
