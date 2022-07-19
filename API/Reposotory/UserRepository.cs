using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Helpers;
using API.InterFaces;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Reposotory
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationDbContext db;
        private readonly IMapper mapper;

        public UserRepository(UserManager<ApplicationUser> _userManager,
         ApplicationDbContext _db,IMapper mapper)
        {
            userManager = _userManager;
            db = _db;
            this.mapper = mapper;
        }

        public Task<ApplicationUser> GetUserByIdAsync(string id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<PageList<MemberDto>> GetUsersAsync(UserParams userParams)
        {
           var query = userManager.Users.OrderBy(x=> x.FirstName)
           .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
           .AsNoTracking();
        
           return await PageList<MemberDto>.CreatAsync(query,userParams.PageNumber,
                        userParams.PageSize);
        }
    }
}