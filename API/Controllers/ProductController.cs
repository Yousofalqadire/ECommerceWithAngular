using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.InterFaces;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
     [Route("api/Product")]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly IPhoto image;
        private readonly IProductRepository _product;

        public ProductController(ApplicationDbContext _db, IPhoto _image, IProductRepository prod)
        {
            db = _db;
            image = _image;
            _product = prod;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var result = await _product.GetProductsAsync();
            return Ok(result);
        }
        // [Route("GetProductById")]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            return await _product.GetProductByIdAsync(id);
        }
        // [Route("GetProductByName")]
        // [HttpGet("{name}")]
        // public async Task<ActionResult<Product>> GetProductByName(string name)
        // {
        //     return await db.Products.SingleOrDefaultAsync(x=> x.Name == name);
        // }
        // [Route("GetProductByCategory")]
        [HttpGet("GetProductByCategory/{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory([FromQuery]string name)
        {
           return Ok( await _product.GetProductByCateloge(name));
             
        }

         [HttpGet("get-categorys")]
         public ActionResult<IEnumerable<string>> GetCategorys()
         {
           List<string> result = db.Products.Select(x=> x.Category).Distinct().ToList();
             return Ok(result);
         }
         [Authorize(Roles="Admin")]
        [HttpPost("add-product")]

        public async Task<ActionResult<Product>> AddProduct([FromForm] ProductDto product)
        {
            
            var p = new Product();
            var result = await image.AddPhotoAsync(product.Image);
            if(result.Error != null) return BadRequest(result.Error.Message);
             p.Name = product.Name;
             p.Brand = product.Brand;
             p.Category = product.Category;
             p.Details = product.Details;
             p.Price = product.Price;

            var photo = new Photo
            {
                 Url = result.SecureUrl.AbsoluteUri,
             PublicId = result.PublicId
            };
            p.Photo = photo;
            var _sizes = new List<Size>();
            foreach(var item in product.Sizes)
            {
                var size = new Size{Value = item};
                _sizes.Add(size);
            }
            p.Sizes = _sizes;
            await _product.AddProductAsync(p);
            return Ok(p);
        }
       
       [HttpDelete("{id:int}")]

       public async Task<ActionResult> DeleteProduct(int id)
       {
           var product = await _product.GetProductByIdAsync(id);
           var photo = product.Photo;
           if(photo.PublicId == null) return NotFound();

            var result = await image.DeletPhotoAsync(photo.PublicId);
            if(result.Error != null) return BadRequest(result.Error.Message);
            var resultDeleted = _product.DeleteProduct(id);

           return Ok(resultDeleted);
       }

    }
}