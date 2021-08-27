
using API.DTOs;
using API.Models;
using AutoMapper;
namespace API.Helpers
{
    public class AutoMapperProduct : Profile
    {
        public AutoMapperProduct()
        {
            CreateMap<Product,ProductDto>();
           // CreateMap<Photo,PhotoDto>();
        }
    }
}