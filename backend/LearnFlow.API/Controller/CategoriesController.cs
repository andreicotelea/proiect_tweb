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

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var data = _categories.GetAll().FirstOrDefault(c => c.Id == id);
            if (data == null)
                return NotFound(new { isSuccess = false, message = "Categoria nu a fost gasita." });
            return Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _categories.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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
