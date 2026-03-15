using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Entities;

public class User
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    public string Role { get; set; } = "student";

    public string Avatar { get; set; } = "U";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<UserProgress> Progress { get; set; } = new List<UserProgress>();
    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
    public ICollection<UserAchievement> Achievements { get; set; } = new List<UserAchievement>();
}
