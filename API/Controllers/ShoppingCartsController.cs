using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.InterFaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
      
      [ApiController]
      [Authorize]
      [Route("api/ShoppingCarts")]
    public class ShoppingCartsController : ControllerBase
    {
        private readonly ICartRepository shoppingCart ;
        private readonly ApplicationDbContext db;
        public ShoppingCartsController(ICartRepository cart, ApplicationDbContext _db)
        {
            this.shoppingCart = cart;
            this.db = _db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingCart>>> GetCarts()
        {
            var result = await shoppingCart.GetAllCartAsync();
          return Ok(result);   
        }
        
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ShoppingCart>> GetCartItem(int id)
        {
            var result = await shoppingCart.GetCartAsync(id);
            return Ok(result);
        }
        
        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<ShoppingCart>>> GetUserCart([FromQuery]string username)
        {
            var result = await shoppingCart.GetCartByUserNameAsync(username);
            return Ok(result);
        }
        
        [HttpPost("add-item")]
        public async Task<ActionResult<ShoppingCart>> AddItem([FromBody]ShoppingCart model)
        {
            if(model.SelectedSize == null) return BadRequest("there are no size selected");
            else if(model.User == null) return Forbid("you dont have account");
           
            var result = await shoppingCart.AddToCartAsync(model);
            // delete from sizes 
            var product = await db.Products.Include(x=> x.Sizes)
            .SingleOrDefaultAsync(x => x.Id == model.ProductId);
              foreach(var size in product.Sizes.ToList()) 
              {
                  if(size.Value == model.SelectedSize)
                  {
                      if(size.Quantity > 1)
                      {
                          size.Quantity -=1;
                          await db.SaveChangesAsync();

                      }
                      else
                      {
                        product.Sizes.Remove(size);
                      }
                      await db.SaveChangesAsync();
                  }
              }      
            return Ok(result);
        }
        
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<int>> DeleteItem([FromRoute]int id)
        {
          var result=  await shoppingCart.DeletItem(id);
            return Ok(result);
        }


    }
}