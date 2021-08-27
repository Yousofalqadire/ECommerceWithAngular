using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.InterFaces;
using API.Models;

using Microsoft.EntityFrameworkCore;

namespace API.Reposotory
{
    public class CartRepository : ICartRepository
    {
      private readonly  ApplicationDbContext db;
      
        public CartRepository(ApplicationDbContext _db)
        {
            db = _db;
            
        }      

        public async Task<ShoppingCart> AddToCartAsync(ShoppingCart cart)
        {
           
            var c = await db.ShoppingCarts.SingleOrDefaultAsync(x=> x.ProductId == cart.ProductId
              && x.SelectedSize == cart.SelectedSize);

           if(c != null)
           {
               c.Quantity++;
               
           }
           else
           {
               await db.ShoppingCarts.AddAsync(cart);

           }
            await db.SaveChangesAsync();
            return cart;
        }

        public async Task<int> DeletItem(int id)
        {
            var result = await db.ShoppingCarts.SingleOrDefaultAsync(x=> x.Id == id);
           
            db.ShoppingCarts.Remove(result);
          await  db.SaveChangesAsync();
            return id;
        }

        public async Task<IEnumerable<ShoppingCart>> GetAllCartAsync()
        {
           return await db.ShoppingCarts.ToListAsync();
        }

        public async Task<ShoppingCart> GetCartAsync(int id)
        {
            return await db.ShoppingCarts.FindAsync(id);
        }

        public async Task<IEnumerable<ShoppingCart>> GetCartByUserNameAsync(string username)
        {
            return  await  db.ShoppingCarts.Where(x=> x.User == username).ToListAsync();
        }

        // public async Task<double> MainAmmountAsync(string username)
        // {
        //     var carts = await db.ShoppingCarts.Where(x=> x.User == username).ToArrayAsync();
        //     double mainAmmount = 0;
        //     for(int i = 0; i<= carts.Length;i++)
        //     mainAmmount+= carts[i].ProductPric;
        //     return mainAmmount;
        // }

        
    }
}