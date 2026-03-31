using Microsoft.EntityFrameworkCore;
using LearnFlow.BusinessLayer.DTOs;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.DataAccessLayer;
using LearnFlow.Domain.Entities.Category;

namespace LearnFlow.BusinessLayer.Services;

public class CategoryService : ICategoryService
{
    private readonly AppDbContext _db;

    public CategoryService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<CategoryDto>> GetAll()
    {
        var categories = await _db.Categories.Include(c => c.Lessons).ToListAsync();
        return categories.Select(c => new CategoryDto
        {
            Id = c.Id,
            Name = c.Name,
            Description = c.Description,
            Icon = c.Icon,
            LessonCount = c.Lessons.Count,
        }).ToList();
    }

    public async Task<CategoryDto> Create(CreateCategoryDto dto)
    {
        var category = new CategoryData
        {
            Name = dto.Name,
            Description = dto.Description,
            Icon = dto.Icon,
        };

        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            Icon = category.Icon,
            LessonCount = 0,
        };
    }

    public async Task<CategoryDto?> Update(int id, CreateCategoryDto dto)
    {
        var category = await _db.Categories.Include(c => c.Lessons).FirstOrDefaultAsync(c => c.Id == id);
        if (category == null) return null;

        category.Name = dto.Name;
        category.Description = dto.Description;
        category.Icon = dto.Icon;

        await _db.SaveChangesAsync();

        return new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            Description = category.Description,
            Icon = category.Icon,
            LessonCount = category.Lessons.Count,
        };
    }

    public async Task<bool> Delete(int id)
    {
        var category = await _db.Categories.FindAsync(id);
        if (category == null) return false;

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
        return true;
    }
}
