using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.InterFaces;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Reposotory
{
    public class CuroselRepository : ICuroselRepository
    {
        public ApplicationDbContext Db { get; }
        public IPhoto Photo { get; }
        public CuroselRepository(ApplicationDbContext db, IPhoto _photo)
        {
            Photo = _photo;
            this.Db = db;
        }

        public async Task<ClodinaryResponse> CreatAsync(AddCuroselDto curoselDto)
        {
             var result = await Photo.AddPhotoAsync(curoselDto.Photo);
             if(result.Error != null) return new ClodinaryResponse(result.Error.Message);
            var curosel = new Curosel();
            var curoselImage = new CuroselPhoto
            {
               Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };
            curosel.CapationText = curoselDto.CapationText;
            curosel.Photo = curoselImage;
            Db.Curosels.Add(curosel);
            await Db.SaveChangesAsync();
            return new ClodinaryResponse("the item added successfuly"); 
           


        }

        public async Task<ClodinaryResponse> DeleteAsync(int id)
        {
            var curosel = await Db.Curosels.Include(x=> x.Photo).SingleOrDefaultAsync(x=> x.Id == id);
            var _photo = curosel.Photo;
            if(curosel != null)
            {
                var result = await Photo.DeletPhotoAsync(_photo.PublicId);
                if(result.Error != null)
                {
                    return new ClodinaryResponse(result.Error.Message);
                }
                Db.Curosels.Remove(curosel);
                await Db.SaveChangesAsync();
                return new ClodinaryResponse("item deleted successfuly");
            }
            return new ClodinaryResponse("there are an error acured");
        }

        public async Task<IEnumerable<Curosel>> GetAllAsync()
        {
            var result = await Db.Curosels.Include(x=> x.Photo).ToListAsync();
            return result;
        }

        public async Task<Curosel> GetByIdAsync(int id)
        {
            return await Db.Curosels.Include(x=> x.Photo).SingleOrDefaultAsync(x=> x.Id == id);
        }

        public async Task<Curosel> UpdateAsync(AddCuroselDto curosel)
        {
           var _curosel = await Db.Curosels.Include(x=> x.Photo).SingleOrDefaultAsync(x=> x.Id == curosel.Id);
           if(_curosel != null)
           {
               var _photo = _curosel.Photo;
               var result = await Photo.DeletPhotoAsync(_photo.PublicId);
               var uplodNewPhoto = await Photo.AddPhotoAsync(curosel.Photo);
               var image = new CuroselPhoto
               {
                   Url = uplodNewPhoto.SecureUrl.AbsoluteUri,
                PublicId = uplodNewPhoto.PublicId
               };
                _curosel.CapationText = curosel.CapationText;
                _curosel.Photo = image;
                await Db.SaveChangesAsync();
           }  
           return _curosel;          
           

        }
    }
}