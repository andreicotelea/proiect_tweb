using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Progress
{
    public class EnrollDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int UserId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int LessonId { get; set; }
    }
}
