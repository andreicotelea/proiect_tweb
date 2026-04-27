using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Entities.Lesson;
using LearnFlow.Domain.Entities.Category;
using LearnFlow.Domain.Entities.Progress;
using LearnFlow.Domain.Entities.Submission;
using LearnFlow.Domain.Entities.Achievement;

namespace LearnFlow.DataAccessLayer.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserData> Users { get; set; }
        public DbSet<LessonData> Lessons { get; set; }
        public DbSet<LessonSectionData> LessonSections { get; set; }
        public DbSet<CategoryData> Categories { get; set; }
        public DbSet<UserProgressData> UserProgress { get; set; }
        public DbSet<SubmissionData> Submissions { get; set; }
        public DbSet<AchievementData> Achievements { get; set; }
        public DbSet<UserAchievementData> UserAchievements { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(DbSession.ConnectionString);
        }
    }
}
