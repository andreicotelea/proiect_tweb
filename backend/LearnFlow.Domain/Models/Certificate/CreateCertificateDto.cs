using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Models.Certificate
{
    public class CreateCertificateDto
    {
        [Required(ErrorMessage = "Titlul este obligatoriu.")]
        [StringLength(200, MinimumLength = 3)]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Categoria este obligatorie.")]
        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Range(1, 100)]
        public int LessonsRequired { get; set; } = 1;

        [StringLength(30)]
        public string Duration { get; set; } = "10h";

        public string? PdfUrl { get; set; }

        public string? VideoUrl { get; set; }
    }
}
