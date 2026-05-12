using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.Category;

namespace LearnFlow.Domain.Entities.Certificate;

public class CertificateData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Required]
    public int CategoryId { get; set; }

    public int LessonsRequired { get; set; } = 1;

    [StringLength(30)]
    public string Duration { get; set; } = "10h";

    public string? PdfUrl { get; set; }

    public string? VideoUrl { get; set; }

    [DataType(DataType.DateTime)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("CategoryId")]
    public CategoryData Category { get; set; } = null!;
}
