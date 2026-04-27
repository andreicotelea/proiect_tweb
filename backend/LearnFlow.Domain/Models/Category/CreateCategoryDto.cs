using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Category
{
    public class CreateCategoryDto
    {
        [Required(ErrorMessage = "Numele categoriei este obligatoriu.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Numele trebuie sa aiba intre 2 si 100 caractere.")]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [StringLength(10)]
        public string Icon { get; set; } = "CT";
    }
}
