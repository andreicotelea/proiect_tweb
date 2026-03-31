using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.Category;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.ICategoryService _categories;

        public CategoriesController()
        {
            var bl = new BusinessLogic();
            _categories = bl.GetCategoryActions();
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var data = _categories.GetAll();
            return Ok(new { data });
        }

        [HttpPost]
        public IActionResult Create(CreateCategoryDto dto)
        {
            var result = _categories.Create(dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, CreateCategoryDto dto)
        {
            var result = _categories.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _categories.Delete(id);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }
    }
}
