using System.Collections.Generic;
using System.Threading.Tasks;
using API.InterFaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Sales")]
    [Authorize(Roles ="Admin")]
    public class SalesController : ControllerBase
    {
        private readonly ISalesRepository sales;
        public SalesController(ISalesRepository _sales)
        {
            sales = _sales;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Sale>> GetSaleById(int id)
        {
            return Ok(await sales.GetSaleById(id));
        }

        [HttpGet("get-sales")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            return Ok(await sales.GetSalesAsync());
        }

        [HttpGet("get-sales-by-month/{month}")]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSalesByMonth([FromRoute]int month)
        {
            return Ok(await sales.GetSalesByMonth(month));
        }
         [HttpGet("get-months/{year}")]
        public async Task<ActionResult<IEnumerable<int>>> GetMonths([FromRoute]int year)
        {
            return Ok(await sales.GetMonthsAsync(year));
        }
          [HttpGet("get-yers")]
        public async Task<ActionResult<IEnumerable<int>>> GetYears()
        {
            return Ok(await sales.GetYearsAsync());
        }

    }
}