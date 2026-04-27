using AutoMapper;
using LearnFlow.Domain.Entities.User;
using LearnFlow.Domain.Models.User;

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
        }
    }
}
