using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        internal BusinessLayer.Interfaces.IAdminService _admin;

        public AdminController()
        {
            var bl = new BusinessLayer.BusinessLogic();
            _admin = bl.AdminAction();
        }

        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            var stats = _admin.GetStats();
            return Ok(stats);
        }
    }
}
