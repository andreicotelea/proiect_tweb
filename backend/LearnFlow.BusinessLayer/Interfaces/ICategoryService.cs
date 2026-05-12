using LearnFlow.Domain.Models.Category;
using LearnFlow.Domain.Models.Responses;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface ICategoryService
{
    List<CategoryDto> GetAll();
    CategoryDto? GetById(int id);
    ActionResponse Create(CreateCategoryDto dto);
    ActionResponse Update(int id, CreateCategoryDto dto);
    ActionResponse Delete(int id);
}
