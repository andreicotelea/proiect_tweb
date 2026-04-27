using System.Security.Claims;
using LearnFlow.Domain.Enums;

namespace LearnFlow.API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static UserRole GetRole(this ClaimsPrincipal user)
    {
        var role = user.FindFirst(ClaimTypes.Role)?.Value;
        return Enum.TryParse<UserRole>(role, true, out var parsed) ? parsed : UserRole.Guest;
    }

    public static int GetId(this ClaimsPrincipal user) =>
        int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
}
