using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Achievement
{
    public class CreateAchievementDto
    {
        [Required(ErrorMessage = "Titlul este obligatoriu.")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Titlul trebuie sa aiba intre 3 si 100 caractere.")]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [StringLength(10)]
        public string Icon { get; set; } = "AC";

        [Required(ErrorMessage = "Conditia este obligatorie.")]
        public string Condition { get; set; } = string.Empty;
    }
}
