using AutoMapper;
using API.DTOs;
using API.Models;

namespace API.Helpers
{
    public class UserAutoMapper : Profile
    {
        public UserAutoMapper()
        {
            CreateMap<ApplicationUser,MemberDto>();
        }
    }
}