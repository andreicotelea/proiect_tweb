using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Lesson
{
    public class UpdateLessonDto
    {
        [StringLength(200, MinimumLength = 3, ErrorMessage = "Titlul trebuie sa aiba intre 3 si 200 caractere.")]
        public string? Title { get; set; }

        public string? Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "CategoryId invalid.")]
        public int? CategoryId { get; set; }

        [StringLength(20)]
        public string? Difficulty { get; set; }

        [StringLength(30)]
        public string? Duration { get; set; }

        [StringLength(100)]
        public string? ProfesorName { get; set; }

        [StringLength(10)]
        public string? Thumbnail { get; set; }

        public string? VideoUrl { get; set; }

        public bool? IsLocked { get; set; }
    }
}
