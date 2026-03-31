using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Entities.Lesson;
using LearnFlow.Domain.Entities.Category;
using LearnFlow.Domain.Entities.Progress;
using LearnFlow.Domain.Entities.Submission;
using LearnFlow.Domain.Entities.Achievement;

namespace LearnFlow.DataAccessLayer;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UserData> Users => Set<UserData>();
    public DbSet<LessonData> Lessons => Set<LessonData>();
    public DbSet<LessonSectionData> LessonSections => Set<LessonSectionData>();
    public DbSet<CategoryData> Categories => Set<CategoryData>();
    public DbSet<UserProgressData> UserProgress => Set<UserProgressData>();
    public DbSet<SubmissionData> Submissions => Set<SubmissionData>();
    public DbSet<AchievementData> Achievements => Set<AchievementData>();
    public DbSet<UserAchievementData> UserAchievements => Set<UserAchievementData>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Composite key for UserAchievement
        modelBuilder.Entity<UserAchievementData>()
            .HasKey(ua => new { ua.UserId, ua.AchievementId });

        // Unique constraints
        modelBuilder.Entity<UserData>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<CategoryData>()
            .HasIndex(c => c.Name)
            .IsUnique();

        // User -> UserProgress (one-to-many)
        modelBuilder.Entity<UserProgressData>()
            .HasOne(up => up.User)
            .WithMany(u => u.Progress)
            .HasForeignKey(up => up.UserId);

        // Lesson -> UserProgress (one-to-many)
        modelBuilder.Entity<UserProgressData>()
            .HasOne(up => up.Lesson)
            .WithMany(l => l.Progress)
            .HasForeignKey(up => up.LessonId);

        // Category -> Lesson (one-to-many)
        modelBuilder.Entity<LessonData>()
            .HasOne(l => l.Category)
            .WithMany(c => c.Lessons)
            .HasForeignKey(l => l.CategoryId);

        // Lesson -> LessonSection (one-to-many)
        modelBuilder.Entity<LessonSectionData>()
            .HasOne(ls => ls.Lesson)
            .WithMany(l => l.Sections)
            .HasForeignKey(ls => ls.LessonId);

        // User -> Submission (one-to-many)
        modelBuilder.Entity<SubmissionData>()
            .HasOne(s => s.User)
            .WithMany(u => u.Submissions)
            .HasForeignKey(s => s.UserId);

        // UserAchievement -> User
        modelBuilder.Entity<UserAchievementData>()
            .HasOne(ua => ua.User)
            .WithMany(u => u.Achievements)
            .HasForeignKey(ua => ua.UserId);

        // UserAchievement -> Achievement
        modelBuilder.Entity<UserAchievementData>()
            .HasOne(ua => ua.Achievement)
            .WithMany()
            .HasForeignKey(ua => ua.AchievementId);
    }
}
