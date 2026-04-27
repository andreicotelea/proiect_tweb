using AutoMapper;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Entities.Lesson;
using LearnFlow.Domain.Entities.Category;
using LearnFlow.Domain.Models.User;
using LearnFlow.Domain.Models.Lesson;
using LearnFlow.Domain.Models.Category;

namespace LearnFlow.BusinessLayer.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<UserData, UserDto>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt.ToString("yyyy-MM-dd")));

            CreateMap<UserRegisterDto, UserData>()
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore());

            // Lesson mappings
            CreateMap<LessonData, LessonDto>()
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category != null ? src.Category.Name : ""))
                .ForMember(dest => dest.Students, opt => opt.MapFrom(src => src.StudentCount))
                .ForMember(dest => dest.Profesor, opt => opt.MapFrom(src => src.ProfesorName))
                .ForMember(dest => dest.Locked, opt => opt.MapFrom(src => src.IsLocked));

            CreateMap<CreateLessonDto, LessonData>();

            // Category mappings
            CreateMap<CategoryData, CategoryDto>()
                .ForMember(dest => dest.LessonCount, opt => opt.MapFrom(src => src.Lessons.Count));

            CreateMap<CreateCategoryDto, CategoryData>();
        }
    }
}
