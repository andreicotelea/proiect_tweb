namespace LearnFlow.Domain.Models.Category
{
    public class CreateCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = "CT";
    }
}
