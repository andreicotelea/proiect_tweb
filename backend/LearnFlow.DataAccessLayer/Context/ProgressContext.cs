using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities.Progress;

namespace LearnFlow.DataAccessLayer.Context
{
    public class ProgressContext : DbContext
    {
        public DbSet<UserProgressData> UserProgress { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
