using LearnFlow.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace LearnFlow.API.Controller
{
    [Route("api/health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var snapshot = SystemStatusService.Latest;

            if (snapshot == null)
                return Ok(new
                {
                    status = "starting",
                    message = "Health check not yet completed.",
                    checkedAt = DateTime.UtcNow,
                });

            return Ok(new
            {
                status = snapshot.DbOnline ? "healthy" : "degraded",
                database = new
                {
                    online = snapshot.DbOnline,
                    latencyMs = snapshot.DbLatencyMs,
                },
                checkedAt = snapshot.CheckedAt,
            });
        }
    }
}
