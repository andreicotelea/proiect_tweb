using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Lesson
{
    public class CreateLessonSectionDto
    {
        [Required(ErrorMessage = "LessonId este obligatoriu.")]
        [Range(1, int.MaxValue, ErrorMessage = "LessonId invalid.")]
        public int LessonId { get; set; }

        [Required(ErrorMessage = "Titlul sectiunii este obligatoriu.")]
        [StringLength(200, MinimumLength = 3, ErrorMessage = "Titlul trebuie sa aiba intre 3 si 200 caractere.")]
        public string Title { get; set; } = string.Empty;

        [StringLength(30)]
        public string Duration { get; set; } = "10 min";

        [Range(0, 100, ErrorMessage = "Ordinea trebuie sa fie intre 0 si 100.")]
        public int Order { get; set; }
    }
}
