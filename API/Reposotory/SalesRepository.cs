using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.InterFaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Reposotory
{
    public class SalesRepository : ISalesRepository
    {
        private readonly ApplicationDbContext db;
        public SalesRepository(ApplicationDbContext _db)
        {
            db= _db;
        }

        public async Task<IEnumerable<int>> GetMonthsAsync(int year)
        {
            return await db.Sales.Where(x=> x.Year == year)
            .Select(x=> x.Month).Distinct().ToListAsync();

           
        }

        public async Task<Sale> GetSaleById(int id)
        {
            return  await db.Sales.SingleOrDefaultAsync(x=> x.Id == id);
        }

        public async Task<IEnumerable<Sale>> GetSalesAsync()
        {
             return  await db.Sales.ToListAsync();
        }

        public async Task<IEnumerable<Sale>> GetSalesByMonth(int month)
        {
            return await db.Sales.Where(x=> x.Month == month)

            .ToListAsync();
            
           
        }

        public async Task<IEnumerable<int>> GetYearsAsync()
        {
           return await db.Sales.Select(x=> x.Year).Distinct().ToListAsync();

        }
    }
}