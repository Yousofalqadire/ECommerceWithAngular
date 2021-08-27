using System.Collections.Generic;
using System.Threading.Tasks;
using API.InterFaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
      
      [ApiController]
      [Authorize]
      [Route("api/ShoppingCarts")]
    public class ShoppingCartsController : ControllerBase
    {
        private readonly ICartRepository shoppingCart ;
        public ShoppingCartsController(ICartRepository cart)
        {
            this.shoppingCart = cart;
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
            if(model.User == null) return Forbid("you dont have account");
            var result = await shoppingCart.AddToCartAsync(model);
            
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