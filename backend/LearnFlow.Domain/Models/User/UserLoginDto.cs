using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.User
{
    public class UserLoginDto
    {
        [Required(ErrorMessage = "Email-ul este obligatoriu.")]
        [EmailAddress(ErrorMessage = "Format email invalid.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Parola este obligatorie.")]
        public string Password { get; set; } = string.Empty;
    }
}
