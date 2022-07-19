using System.Threading.Tasks;
using API.InterFaces;
using API.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace API.Reposotory
{
    public class PhotoRepository : IPhoto
    {
        private readonly Cloudinary cloudinary;
        public PhotoRepository(IOptions<CloudinarySettings> config)
        {
            var account = new Account
            (
             config.Value.CloudName,
               config.Value.ApiKey,
               config.Value.ApiSecret
            );
               cloudinary = new Cloudinary(account);         
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if(file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName,stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletPhotoAsync(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await cloudinary.DestroyAsync(deleteParams);
            return result;
        }
    }
}