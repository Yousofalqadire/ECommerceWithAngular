using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.InterFaces
{
    public interface ISalesRepository
    {
         Task<IEnumerable<Sale>> GetSalesAsync();
         Task<IEnumerable<int>> GetYearsAsync();
         Task<IEnumerable<int>> GetMonthsAsync(int year); 
         Task<Sale> GetSaleById(int id);
         Task<IEnumerable<Sale>> GetSalesByMonth(int month);
    }
}