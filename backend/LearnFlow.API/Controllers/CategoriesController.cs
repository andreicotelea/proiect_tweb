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
    public IActionResult GetAll()
    {
        var data = _categories.GetAll();
        return Ok(new { data });
    }

    [HttpPost]
    public IActionResult Create([FromBody] CreateCategoryDto dto)
    {
        var result = _categories.Create(dto);
        return Ok(new { message = result.Message });
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] CreateCategoryDto dto)
    {
        var result = _categories.Update(id, dto);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Message });

        return Ok(new { message = result.Message });
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var result = _categories.Delete(id);
        if (!result.IsSuccess)
            return NotFound(new { message = result.Message });

        return Ok(new { message = result.Message });
    }
}
