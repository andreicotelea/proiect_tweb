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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Category -> Lessons
            modelBuilder.Entity<LessonData>()
                .HasOne(l => l.Category)
                .WithMany(c => c.Lessons)
                .HasForeignKey(l => l.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Lesson -> Sections
            modelBuilder.Entity<LessonSectionData>()
                .HasOne(s => s.Lesson)
                .WithMany(l => l.Sections)
                .HasForeignKey(s => s.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            // User -> Progress
            modelBuilder.Entity<UserProgressData>()
                .HasOne(p => p.User)
                .WithMany(u => u.Progress)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Lesson -> Progress
            modelBuilder.Entity<UserProgressData>()
                .HasOne(p => p.Lesson)
                .WithMany(l => l.Progress)
                .HasForeignKey(p => p.LessonId)
                .OnDelete(DeleteBehavior.NoAction);

            // User -> Submissions
            modelBuilder.Entity<SubmissionData>()
                .HasOne(s => s.User)
                .WithMany(u => u.Submissions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // UserAchievement composite key
            modelBuilder.Entity<UserAchievementData>()
                .HasKey(ua => new { ua.UserId, ua.AchievementId });

            // User -> UserAchievements
            modelBuilder.Entity<UserAchievementData>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.Achievements)
                .HasForeignKey(ua => ua.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Achievement -> UserAchievements
            modelBuilder.Entity<UserAchievementData>()
                .HasOne(ua => ua.Achievement)
                .WithMany()
                .HasForeignKey(ua => ua.AchievementId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
