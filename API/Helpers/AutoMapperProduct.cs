
using API.DTOs;
using API.Models;
using AutoMapper;
namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product,ProductDto>();
            CreateMap<ApplicationUser,MemberDto>();
           // CreateMap<Photo,PhotoDto>();
           
        }
    }
}