using AutoMapper;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.BusinessLayer.Mapping;
using LearnFlow.BusinessLayer.Structure;
using Microsoft.Extensions.Logging;

namespace LearnFlow.BusinessLayer
{
    public class BusinessLogic
    {
        private readonly IMapper _mapper;

        public BusinessLogic()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            }, new LoggerFactory());

            _mapper = config.CreateMapper();
        }

        public IAuthService AuthAction() => new AuthActionExecution();
        public ILessonService LessonAction() => new LessonActionExecution();
        public IUserService UserAction() => new UserActionExecution();
        public ICategoryService CategoryAction() => new CategoryActionExecution();
        public IProgressService ProgressAction() => new ProgressActionExecution();
        public ILeaderboardService LeaderboardAction() => new LeaderboardActionExecution();
        public IAdminService AdminAction() => new AdminActionExecution();
        public ISubmissionService SubmissionAction() => new SubmissionActionExecution();
        public IAchievementService AchievementAction() => new AchievementActionExecution();
    }
}
