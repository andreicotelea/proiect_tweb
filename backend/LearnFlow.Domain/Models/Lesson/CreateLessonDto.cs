using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Lesson
{
    public class CreateLessonDto
    {
        [Required(ErrorMessage = "Titlul este obligatoriu.")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "Titlul trebuie sa aiba intre 3 si 200 caractere.")]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Categoria este obligatorie.")]
        [Range(1, int.MaxValue, ErrorMessage = "CategoryId invalid.")]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(20)]
        public string Difficulty { get; set; } = "Beginner";

        [StringLength(30)]
        public string Duration { get; set; } = "30 min";

        [Required(ErrorMessage = "Numele profesorului este obligatoriu.")]
        [StringLength(100)]
        public string ProfesorName { get; set; } = string.Empty;

        [StringLength(10)]
        public string Thumbnail { get; set; } = "DF";

        public string? VideoUrl { get; set; }
        public bool IsLocked { get; set; } = false;
    }
}
