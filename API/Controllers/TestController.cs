using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Test")]
    public class TestController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        List<testSize>sizes = new List<testSize>();
        public TestController(ApplicationDbContext _db)
        {
            db = _db;
        }
        
        [HttpPost]
        public ActionResult postSize([FromForm]List<string> size)
        {
            foreach(var item in size)
            {
              var s = new testSize{Value = item};
              sizes.Add(s);
            }
            return Ok(sizes);
        }

         [HttpGet("get-categorys")]
         public ActionResult<IEnumerable<string>> GetCategorys()
         {
           List<string> result = db.Products.Select(x=> x.Category).Distinct().ToList();
             return Ok(result);
         }

    }
}