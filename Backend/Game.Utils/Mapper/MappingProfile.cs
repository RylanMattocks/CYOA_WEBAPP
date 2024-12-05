using AutoMapper;
using Game.Models.DTO;
using Game.Models.Entities;

namespace Game.Utils.Mapper;

public class MappingProfile : Profile {
    public MappingProfile() {
        CreateMap<Save, SaveDTO>().ReverseMap();
        CreateMap<Save, AddSaveDTO>().ReverseMap();
        CreateMap<Save, UpdateSaveDTO>().ReverseMap();

        CreateMap<User, UserDTO>().ForMember(dest => dest.Saves, opt => opt.MapFrom(src => src.Saves)).ReverseMap();
        CreateMap<User, AddUserDTO>().ReverseMap();
        CreateMap<User, UpdateUserDTO>().ReverseMap();
    }
}