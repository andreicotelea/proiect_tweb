namespace LearnFlow.Domain.Models.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Avatar { get; set; } = string.Empty;
        public string CreatedAt { get; set; } = string.Empty;
        public int Streak { get; set; }
        public int TotalPoints { get; set; }
    }
}
