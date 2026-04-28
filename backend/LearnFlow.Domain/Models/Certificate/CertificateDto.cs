namespace LearnFlow.Domain.Models.Certificate
{
    public class CertificateDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int LessonsRequired { get; set; }
        public string Duration { get; set; } = string.Empty;
        public string? PdfUrl { get; set; }
        public string? VideoUrl { get; set; }
    }
}
