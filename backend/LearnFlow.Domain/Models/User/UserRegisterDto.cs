using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.User
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "Numele este obligatoriu.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele trebuie sa aiba intre 2 si 100 caractere.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email-ul este obligatoriu.")]
        [EmailAddress(ErrorMessage = "Format email invalid.")]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Parola este obligatorie.")]
        [StringLength(100, MinimumLength = 4, ErrorMessage = "Parola trebuie sa aiba minim 4 caractere.")]
        public string Password { get; set; } = string.Empty;
    }
}
