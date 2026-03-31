using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LearnFlow.Domain.Entities.Lesson;

namespace LearnFlow.Domain.Entities.Category;

public class CategoryData
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [StringLength(10)]
    public string Icon { get; set; } = "CT";

    public ICollection<LessonData> Lessons { get; set; } = new List<LessonData>();
}
