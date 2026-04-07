using LearnFlow.Domain.Models.Category;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/categories")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        internal BusinessLayer.Interfaces.ICategoryService _categories;

        public CategoriesController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _categories = bl.CategoryAction();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll()
        {
            var data = _categories.GetAll();
            return Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateCategoryDto dto)
        {
            var result = _categories.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] CreateCategoryDto dto)
        {
            var result = _categories.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _categories.Delete(id);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }
    }
}
