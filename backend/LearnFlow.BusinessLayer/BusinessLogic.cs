using AutoMapper;
using LearnFlow.BusinessLayer.Interfaces;
using LearnFlow.BusinessLayer.Mapping;
using LearnFlow.BusinessLayer.Structure;

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
            });

            _mapper = config.CreateMapper();
        }

        public IAuthService AuthAction() => new AuthActionExecution();
        public ILessonService LessonAction() => new LessonActionExecution();
        public IUserService UserAction() => new UserActionExecution();
        public ICategoryService CategoryAction() => new CategoryActionExecution();
        public IProgressService ProgressAction() => new ProgressActionExecution();
        public ILeaderboardService LeaderboardAction() => new LeaderboardActionExecution();
    }
}
