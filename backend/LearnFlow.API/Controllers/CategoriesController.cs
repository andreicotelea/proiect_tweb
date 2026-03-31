using Microsoft.AspNetCore.Mvc;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.Domain.Models.Category;

namespace LearnFlow.API.Controllers;

[ApiController]
[Route("api/categories")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categories;

    public CategoriesController(ICategoryService categories)
    {
        _categories = categories;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _categories.GetAll();
        return Ok(new { data });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCategoryDto dto)
    {
        var category = await _categories.Create(dto);
        return Ok(new { data = category, message = "Categorie creata" });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateCategoryDto dto)
    {
        var category = await _categories.Update(id, dto);
        if (category == null)
            return NotFound(new { message = "Categoria nu a fost gasita" });

        return Ok(new { data = category, message = "Categorie actualizata" });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _categories.Delete(id);
        if (!deleted)
            return NotFound(new { message = "Categoria nu a fost gasita" });

        return Ok(new { message = "Categorie stearsa" });
    }
}
