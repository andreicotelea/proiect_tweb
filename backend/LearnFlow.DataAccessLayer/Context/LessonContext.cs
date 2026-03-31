using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities.Lesson;
using LearnFlow.Domain.Entities.Category;

namespace LearnFlow.DataAccessLayer.Context
{
    public class LessonContext : DbContext
    {
        public DbSet<LessonData> Lessons { get; set; }
        public DbSet<LessonSectionData> LessonSections { get; set; }
        public DbSet<CategoryData> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
