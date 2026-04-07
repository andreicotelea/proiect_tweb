using LearnFlow.Domain.Models.Category;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class CategoryActionExecution : Core.CategoryActions, ICategoryService
    {
        public List<CategoryDto> GetAll() => GetAllActionExecution();
        public ActionResponse Create(CreateCategoryDto dto) => CreateActionExecution(dto);
        public ActionResponse Update(int id, CreateCategoryDto dto) => UpdateActionExecution(id, dto);
        public ActionResponse Delete(int id) => DeleteActionExecution(id);
    }
}
