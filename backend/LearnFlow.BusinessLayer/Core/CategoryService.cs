using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Models.Category;
using LearnFlow.Domain.Models.Responses;
using LearnFlow.DataAccessLayer.Context;
using LearnFlow.Domain.Entities.Category;

namespace LearnFlow.BusinessLayer.Core
{
    public class CategoryService : Interfaces.ICategoryService
    {
        public List<CategoryDto> GetAll()
        {
            using var context = new LessonContext();
            return context.Categories.Include(c => c.Lessons).Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                Icon = c.Icon,
                LessonCount = c.Lessons.Count,
            }).ToList();
        }

        public ActionResponse Create(CreateCategoryDto dto)
        {
            using var context = new LessonContext();
            var category = new CategoryData
            {
                Name = dto.Name,
                Description = dto.Description,
                Icon = dto.Icon,
            };
            context.Categories.Add(category);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Categorie creata." };
        }

        public ActionResponse Update(int id, CreateCategoryDto dto)
        {
            using var context = new LessonContext();
            var category = context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
                return new ActionResponse { IsSuccess = false, Message = "Categoria nu a fost gasita." };

            category.Name = dto.Name;
            category.Description = dto.Description;
            category.Icon = dto.Icon;
            context.SaveChanges();

            return new ActionResponse { IsSuccess = true, Message = "Categorie actualizata." };
        }

        public ActionResponse Delete(int id)
        {
            using var context = new LessonContext();
            var category = context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
                return new ActionResponse { IsSuccess = false, Message = "Categoria nu a fost gasita." };

            context.Categories.Remove(category);
            context.SaveChanges();
            return new ActionResponse { IsSuccess = true, Message = "Categorie stearsa." };
        }
    }
}
