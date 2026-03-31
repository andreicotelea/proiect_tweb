using LearnFlow.Domain.Models.Category;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAll();
    Task<CategoryDto> Create(CreateCategoryDto dto);
    Task<CategoryDto?> Update(int id, CreateCategoryDto dto);
    Task<bool> Delete(int id);
}
