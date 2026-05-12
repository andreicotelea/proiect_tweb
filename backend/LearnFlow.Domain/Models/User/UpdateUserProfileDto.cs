using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.User
{
    public class UpdateUserProfileDto
    {
        [Required(ErrorMessage = "Numele este obligatoriu.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele trebuie sa aiba intre 2 si 100 caractere.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email-ul este obligatoriu.")]
        [EmailAddress(ErrorMessage = "Format email invalid.")]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [StringLength(10)]
        public string Avatar { get; set; } = "U";
    }
}
