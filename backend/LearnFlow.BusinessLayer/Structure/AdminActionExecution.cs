using LearnFlow.Domain.Models.Admin;
using LearnFlow.BusinessLayer.Interfaces;

namespace LearnFlow.BusinessLayer.Structure
{
    public class AdminActionExecution : Core.AdminActions, IAdminService
    {
        public AdminStatsDto GetStats() => GetStatsActionExecution();
    }
}
