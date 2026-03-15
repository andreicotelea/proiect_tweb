using System.ComponentModel.DataAnnotations;

namespace LearnFlow.Domain.Entities;

public class Achievement
{
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public string Icon { get; set; } = "AC";
    public string Condition { get; set; } = string.Empty;
}
