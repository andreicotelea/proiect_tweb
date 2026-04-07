using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.BusinessLayer.Structure;

namespace LearnFlow.BusinessLayer
{
    public class BusinessLogic
    {
        public IAuthService AuthAction() => new AuthActionExecution();
        public ILessonService LessonAction() => new LessonActionExecution();
        public IUserService UserAction() => new UserActionExecution();
        public ICategoryService CategoryAction() => new CategoryActionExecution();
        public IProgressService ProgressAction() => new ProgressActionExecution();
        public ILeaderboardService LeaderboardAction() => new LeaderboardActionExecution();
    }
}
