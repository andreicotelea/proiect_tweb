using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LearnFlow.Domain.Models.Category;
using LearnFlow.BusinessLayer;

namespace LearnFlow.API.Controller
{
    [Route("api/categories")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly BusinessLayer.Interfaces.ICategoryService _categories;

        public CategoriesController()
        {
            var bl = new BusinessLogic();
            _categories = bl.GetCategoryActions();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll()
        {
            var data = _categories.GetAll();
            return Ok(new { data });
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create(CreateCategoryDto dto)
        {
            var result = _categories.Create(dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, CreateCategoryDto dto)
        {
            var result = _categories.Update(id, dto);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _categories.Delete(id);
            if (!result.IsSuccess) return BadRequest(result.Message);
            return Ok(result);
        }
    }
}
