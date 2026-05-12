using LearnFlow.Domain.Models.Admin;

namespace LearnFlow.BusinessLayer.Interfaces;

public interface IAdminService
{
    AdminStatsDto GetStats();
}
