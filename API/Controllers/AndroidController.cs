using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
     [Route("api/Android")]
    public class AndroidController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public AndroidController(ApplicationDbContext _db)
        {
            this.db = _db;
        }

       [HttpGet("{id:int}")]
       public async Task<ActionResult<Product>> GetProductAsync(int id){
         var result = await db.Products.Include(x => x.Photo)
                    .Include(x => x.Sizes)
                    .SingleOrDefaultAsync(x => x.Id == id);

        return  Ok(result);
        
       }
       
    }
}