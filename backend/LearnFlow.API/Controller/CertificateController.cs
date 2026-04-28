using LearnFlow.Domain.Models.Certificate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/certificates")]
    [ApiController]
    public class CertificateController : ControllerBase
    {
        internal BusinessLayer.Interfaces.ICertificateService _certificates;

        public CertificateController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _certificates = bl.CertificateAction();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll()
        {
            var data = _certificates.GetAll();
            return Ok(data);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetById(int id)
        {
            var cert = _certificates.GetById(id);
            if (cert == null)
                return NotFound(new { isSuccess = false, message = "Certificarea nu a fost gasita." });
            return Ok(cert);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public IActionResult Create([FromBody] CreateCertificateDto dto)
        {
            var result = _certificates.Create(dto);
            if (!result.IsSuccess) return BadRequest(result);
            return StatusCode(201, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Update(int id, [FromBody] CreateCertificateDto dto)
        {
            var result = _certificates.Update(id, dto);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var result = _certificates.Delete(id);
            if (!result.IsSuccess) return NotFound(result);
            return Ok(result);
        }
    }
}
