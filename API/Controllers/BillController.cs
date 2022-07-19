using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Bill")]
    [Authorize(Roles ="Admin")]
    public class BillController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public BillController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("get-bill-byId/{billId}")]
        public async Task<ActionResult<Bill>> GetBillById([FromRoute]int billId)
        {
            return Ok(await db.Bills.SingleOrDefaultAsync(x=> x.Id == billId));
        }

      [HttpPost("saveBill")]
      public async Task<ActionResult> SaveBill([FromBody] BillDto bill)
      {
         await db.Bills.AddAsync(new Bill{
             UserName=bill.UserName,
             Date = DateTime.Now ,
             Address = bill.Address,
             Phone = bill.Phone
             });
            await db.SaveChangesAsync();
         var _BillId = db.Bills.Select(x=> x.Id).Max();
         var cart = db.ShoppingCarts.Where(x=> x.User == bill.UserName).ToList();
         foreach(var c in cart)
         {
             await db.BillDetails.AddAsync(new BillDetail{
                 BillId =_BillId,
                 ProductId= c.ProductId ,
                 ProductName = c.ProductName,
                 ProductPrice = c.ProductPric,
                 SelectedSize = c.SelectedSize,
                 Quantity = c.Quantity,
                 TotalPrice = c.TotalPrice
                 });
         }
          db.ShoppingCarts.RemoveRange(cart);
         await db.SaveChangesAsync();
          return Ok(bill);
      }

   [HttpGet("git-bills")]
   public async Task<ActionResult<IEnumerable<Bill>>> getBills()
   {
  
       return await db.Bills.Where(x=> x.Status < 3)
       .ToListAsync();
   }

   
       [HttpGet("{id:int}")]
       public async Task<ActionResult> GitBillDetails(int id)
       {
           var _result = await db.BillDetails.Where(x=> x.BillId == id).ToListAsync();
            
           return Ok(_result);
       }
    
    [HttpPut("update-bill")]
    public async Task<ActionResult<Bill>> UpdateBill([FromBody]UpdateBill model)
    {
        var bill = await db.Bills.SingleOrDefaultAsync(x=> x.Id == model.BillId);
        bill.Status = model.Status;
        await db.SaveChangesAsync();
        return Ok(bill);
    }
    [AllowAnonymous]
    [HttpPost("add-to-sales/{id}")]
    public async Task<ActionResult<Sale>> AddToSail([FromRoute]int id)
    {
        var bill = db.Bills.SingleOrDefault(x=> x.Id == id);
        var billDetails = db.BillDetails.Where(x=> x.BillId == bill.Id);
        int year = bill.Date.Year;
        int month = bill.Date.Month;
        double Amount = 0;
        foreach(var total in billDetails)
        {
            Amount += total.TotalPrice;
        }
        var date = DateTime.Now.ToString();
        var sale = new Sale{Month = month,Year = year, Amount = Amount};
        await db.Sales.AddAsync(sale);
        await db.SaveChangesAsync();
     return Ok(sale);
    }
    }


}