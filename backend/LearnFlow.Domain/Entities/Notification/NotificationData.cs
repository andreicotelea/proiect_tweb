using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.User;

namespace LearnFlow.Domain.Entities.Notification;

public class NotificationData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    [Required]
    [StringLength(30)]
    public string Type { get; set; } = "info";

    public int? UserId { get; set; }

    public bool IsRead { get; set; } = false;

    [DataType(DataType.DateTime)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("UserId")]
    public UserData? User { get; set; }
}
