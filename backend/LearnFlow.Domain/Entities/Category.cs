using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Entities;

public class Category
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = "CT";

    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
