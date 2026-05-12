using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Progress
{
    public class UpdateProgressDto
    {
        [Required(ErrorMessage = "UserId este obligatoriu.")]
        [Range(1, int.MaxValue, ErrorMessage = "UserId invalid.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "LessonId este obligatoriu.")]
        [Range(1, int.MaxValue, ErrorMessage = "LessonId invalid.")]
        public int LessonId { get; set; }

        [Required(ErrorMessage = "Procentul este obligatoriu.")]
        [Range(0, 100, ErrorMessage = "Procentul trebuie sa fie intre 0 si 100.")]
        public int Percent { get; set; }
    }
}
