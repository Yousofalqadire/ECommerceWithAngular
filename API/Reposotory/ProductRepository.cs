using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.InterFaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Reposotory
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext db;
        public ProductRepository(ApplicationDbContext _db)
        {
            db = _db;
        }

        public async Task AddProductAsync(Product product)
        {
            var p = db.Products.Max(x => x.Id);
            product.Id = p + 1;
            await db.Products.AddAsync(product);
            
            await db.SaveChangesAsync(); 
        }

        public async Task<string> DeleteProduct(int id)
        {
           var p = await db.Products.SingleOrDefaultAsync(x=> x.Id == id);
            db.Products.Remove(p);
            await db.SaveChangesAsync();
            return "product deleted";
        }

        public async Task<IEnumerable<Product>> GetProductByCateloge(string cateloge)
        {
          var query = db.Products
          .Include(x=> x.Photo)
          .Include(x=> x.Sizes)
          .AsQueryable();
          return await query.Where(x=> x.Category == cateloge).ToListAsync(); 
          

        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await db.Products.Include(x=> x.Photo)
            .Include(x=> x.Sizes)
            .SingleOrDefaultAsync(x=> x.Id == id);
            
        }

        public async Task<Product> GetProductByName(string name)
        {
           return await db.Products.Include(x=> x.Photo)
           .Include(x=> x.Sizes)
            .SingleOrDefaultAsync(x=> x.Name == name) ;
            
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await db.Products.Include(x=> x.Photo)
            .Include(x=> x.Sizes)
            .ToListAsync();
            
        }

        public void Update(Product product)
        {
            db.Entry(product).State = EntityState.Modified;
        }

        
    }
}