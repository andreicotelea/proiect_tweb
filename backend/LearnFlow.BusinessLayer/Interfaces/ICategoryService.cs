using LearnFlow.BusinessLayer.DTOs;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAll();
    Task<CategoryDto> Create(CreateCategoryDto dto);
    Task<CategoryDto?> Update(int id, CreateCategoryDto dto);
    Task<bool> Delete(int id);
}
