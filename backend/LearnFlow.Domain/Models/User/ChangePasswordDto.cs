using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.User
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Parola curenta este obligatorie.")]
        public string CurrentPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "Parola noua este obligatorie.")]
        [StringLength(100, MinimumLength = 4, ErrorMessage = "Parola noua trebuie sa aiba minim 4 caractere.")]
        public string NewPassword { get; set; } = string.Empty;
    }
}
