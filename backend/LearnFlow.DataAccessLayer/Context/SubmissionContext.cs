using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities.Submission;

namespace LearnFlow.DataAccessLayer.Context
{
    public class SubmissionContext : DbContext
    {
        public DbSet<SubmissionData> Submissions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
