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
using System;

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
        [AllowAnonymous]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            return await _product.GetProductByIdAsync(id);
        }
        
        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByCategory([FromQuery]string name)
        {
           var result = await _product.GetProductByCateloge(name);
            
           return Ok( result);
             
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
             //
            var id = db.Products.Include(x => x.Photo)
            .Max(x => x.Photo.Id);

            var photo = new Photo
            {
                 Id = id + 1,
                 Url = result.SecureUrl.AbsoluteUri,
                 PublicId = result.PublicId
            };
            p.Photo = photo;

            var _size = db.Products.Include(x => x.Sizes).Max(x=> x.Sizes.Max(x=> x.Id));
             
            var _sizes = new List<Size>();
            foreach(var item in product.Sizes)
            {
                
                var size = new Size
                {
                    Id = _size + 1,
                    Value = item,
                    Quantity = 1
                };               
                _sizes.Add(size);
                _size++;
            }
           
            p.Sizes = _sizes;
            await _product.AddProductAsync(p);
            return Ok(p);
        }
       [Authorize(Roles="Admin")]
       [HttpDelete("{id:int}")]

       public async Task<ActionResult> DeleteProduct([FromRoute]int id)
       {
           var product = await _product.GetProductByIdAsync(id);
           var photo = product.Photo;
           if(photo.PublicId == null) return NotFound();

            var result = await image.DeletPhotoAsync(photo.PublicId);
            if(result.Error != null) return BadRequest(result.Error.Message);
            var resultDeleted = _product.DeleteProduct(id);

           return Ok(resultDeleted);
       }
       [Authorize(Roles="Admin")]
       [HttpPut("update-product")]
       public async Task<ActionResult<Product>> UpdateProduct([FromForm] ProductDto product)
       {
           var p = await _product.GetProductByIdAsync(product.Id);

           if(p == null) return NotFound();

           // delete photo from cloudenary
            var photo = p.Photo;
           if(photo.PublicId == null) return NotFound();
   
            var _result = await image.DeletPhotoAsync(photo.PublicId);
            if(_result.Error != null) return BadRequest(_result.Error.Message);

            // upload new photo to cloudenary
           var result = await image.AddPhotoAsync(product.Image);
            if(result.Error != null) return BadRequest(result.Error.Message);
            
            p.Brand = product.Brand;
            p.Category = product.Category;
            p.Details = product.Details;
            p.Name = product.Name;
            p.Price = product.Price;
            var _sizes = new List<Size>();
            foreach(var item in product.Sizes)
            {
                var size = new Size{Value = item,Quantity = 1};
                
                
                _sizes.Add(size);
            }
            p.Sizes = _sizes;
            var _photo = new Photo
            {
                 Url = result.SecureUrl.AbsoluteUri,
             PublicId = result.PublicId
            };
            p.Photo = _photo;
           await db.SaveChangesAsync();
           return Ok(p);
       }

    }
}