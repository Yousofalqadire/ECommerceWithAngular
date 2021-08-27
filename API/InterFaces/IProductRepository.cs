using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.InterFaces
{
    public interface IProductRepository
    {
         Task<IEnumerable<Product>> GetProductsAsync();
         Task<Product> GetProductByIdAsync(int id);
         Task<Product> GetProductByName(string name);
         Task<IEnumerable<Product>> GetProductByCateloge(string cateloge);
          Task AddProductAsync(Product product);
          void Update(Product product);
          Task<string> DeleteProduct(int id);
    }
}