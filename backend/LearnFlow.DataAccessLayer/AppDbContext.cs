using Microsoft.EntityFrameworkCore;
using LearnFlow.Domain.Entities;

namespace LearnFlow.DataAccessLayer;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Lesson> Lessons => Set<Lesson>();
    public DbSet<LessonSection> LessonSections => Set<LessonSection>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<UserProgress> UserProgress => Set<UserProgress>();
    public DbSet<Submission> Submissions => Set<Submission>();
    public DbSet<Achievement> Achievements => Set<Achievement>();
    public DbSet<UserAchievement> UserAchievements => Set<UserAchievement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Composite key for UserAchievement
        modelBuilder.Entity<UserAchievement>()
            .HasKey(ua => new { ua.UserId, ua.AchievementId });

        // Unique constraints
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique();

        // User -> UserProgress (one-to-many)
        modelBuilder.Entity<UserProgress>()
            .HasOne(up => up.User)
            .WithMany(u => u.Progress)
            .HasForeignKey(up => up.UserId);

        // Lesson -> UserProgress (one-to-many)
        modelBuilder.Entity<UserProgress>()
            .HasOne(up => up.Lesson)
            .WithMany(l => l.Progress)
            .HasForeignKey(up => up.LessonId);

        // Category -> Lesson (one-to-many)
        modelBuilder.Entity<Lesson>()
            .HasOne(l => l.Category)
            .WithMany(c => c.Lessons)
            .HasForeignKey(l => l.CategoryId);

        // Lesson -> LessonSection (one-to-many)
        modelBuilder.Entity<LessonSection>()
            .HasOne(ls => ls.Lesson)
            .WithMany(l => l.Sections)
            .HasForeignKey(ls => ls.LessonId);

        // User -> Submission (one-to-many)
        modelBuilder.Entity<Submission>()
            .HasOne(s => s.User)
            .WithMany(u => u.Submissions)
            .HasForeignKey(s => s.UserId);

        // UserAchievement -> User
        modelBuilder.Entity<UserAchievement>()
            .HasOne(ua => ua.User)
            .WithMany(u => u.Achievements)
            .HasForeignKey(ua => ua.UserId);

        // UserAchievement -> Achievement
        modelBuilder.Entity<UserAchievement>()
            .HasOne(ua => ua.Achievement)
            .WithMany()
            .HasForeignKey(ua => ua.AchievementId);
    }
}
