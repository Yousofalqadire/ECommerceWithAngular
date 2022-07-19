using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Models;

namespace API.InterFaces
{
    public interface IUserRepository
    {
         Task<PageList<MemberDto>> GetUsersAsync(UserParams userParams);
         Task<ApplicationUser> GetUserByIdAsync(string id);
    }
}