using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Submission
{
    public class CreateSubmissionDto
    {
        [Required(ErrorMessage = "UserId este obligatoriu.")]
        [Range(1, int.MaxValue, ErrorMessage = "UserId invalid.")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "LessonId este obligatoriu.")]
        [Range(1, int.MaxValue, ErrorMessage = "LessonId invalid.")]
        public int LessonId { get; set; }

        [Required(ErrorMessage = "Score este obligatoriu.")]
        [Range(0, 100, ErrorMessage = "Score trebuie sa fie intre 0 si 100.")]
        public int Score { get; set; }

        [Required(ErrorMessage = "MaxScore este obligatoriu.")]
        [Range(1, 100, ErrorMessage = "MaxScore trebuie sa fie intre 1 si 100.")]
        public int MaxScore { get; set; }
    }
}
