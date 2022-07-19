using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.InterFaces
{
    public interface ICartRepository
    {
         Task<IEnumerable<ShoppingCart>> GetAllCartAsync();
         Task<ShoppingCart> GetCartAsync(int id);
         Task<IEnumerable<ShoppingCart>> GetCartByUserNameAsync(string username);
         Task<ShoppingCart> AddToCartAsync(ShoppingCart cart);
         Task<int> DeletItem(int id);
        
        //  Task<double> MainAmmountAsync(string username);

    }
}