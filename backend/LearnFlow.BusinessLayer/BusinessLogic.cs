using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.BusinessLayer.Core;

namespace LearnFlow.BusinessLayer
{
    public class BusinessLogic
    {
        public IAuthService GetAuthActions() => new AuthService();
        public ILessonService GetLessonActions() => new LessonService();
        public IUserService GetUserActions() => new UserService();
        public ICategoryService GetCategoryActions() => new CategoryService();
        public IProgressService GetProgressActions() => new ProgressService();
        public ILeaderboardService GetLeaderboardActions() => new LeaderboardService();
    }
}
