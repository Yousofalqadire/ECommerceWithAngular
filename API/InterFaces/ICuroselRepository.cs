using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using API.Services;

namespace API.InterFaces
{
    public interface ICuroselRepository
    {
         Task<Curosel> GetByIdAsync(int id);
         Task<IEnumerable<Curosel>> GetAllAsync();
         Task<ClodinaryResponse> DeleteAsync(int id);
         Task<Curosel> UpdateAsync(AddCuroselDto curosel);
         Task<ClodinaryResponse> CreatAsync(AddCuroselDto curoselDto);
    }
}