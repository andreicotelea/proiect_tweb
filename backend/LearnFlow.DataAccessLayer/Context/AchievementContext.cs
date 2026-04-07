using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities.Achievement;

namespace LearnFlow.DataAccessLayer.Context
{
    public class AchievementContext : DbContext
    {
        public DbSet<AchievementData> Achievements { get; set; }
        public DbSet<UserAchievementData> UserAchievements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
