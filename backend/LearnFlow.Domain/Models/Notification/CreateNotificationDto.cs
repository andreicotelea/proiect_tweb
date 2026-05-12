using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Notification
{
    public class CreateNotificationDto
    {
        [Required(ErrorMessage = "Titlul este obligatoriu.")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "Titlul trebuie sa aiba intre 3 si 200 caractere.")]
        public string Title { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        [Required]
        [StringLength(30)]
        public string Type { get; set; } = "info";

        public int? UserId { get; set; }
    }
}
