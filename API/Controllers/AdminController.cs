using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.InterFaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Admin")]
    [Authorize(Roles ="Admin")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext db;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IProductRepository _product;
        public AdminController(ApplicationDbContext _db,
                   RoleManager<IdentityRole> _roleManager,
                   UserManager<ApplicationUser> _userManager,
                   IProductRepository product)
        {
            db = _db;
            roleManager = _roleManager;
            userManager = _userManager;
            _product = product;
        }

        [HttpPost("creat-role")]

        public async Task<ActionResult<RoleDto>> CreatRole([FromBody]RoleDto model)
        {
            if(ModelState.IsValid)
            {
                var roleExist = await roleManager.FindByNameAsync(model.RoleName);
                if(roleExist != null) 
                {
                    return BadRequest("this role is exist");
                }

                IdentityRole role = new IdentityRole{Name = model.RoleName};
              IdentityResult result = await  roleManager.CreateAsync(role);
              if(result.Succeeded) return Ok($"the role with name {model.RoleName} created succesfuly ");
               foreach(var e in result.Errors)
               {
                    ModelState.AddModelError("", e.Description);
               }
            }
             return Ok(model); 
        }

        [HttpGet("get-roles")]
        public async Task<ActionResult> GetRoles()
        {
            var result = await roleManager.Roles.ToListAsync();
            return Ok(result);
        }

        [HttpGet("get-users")]
        public async Task<ActionResult> GetUsers()
        {
            var result = await userManager.Users.ToListAsync();
            return Ok(result);
        }
        [HttpPut("add-to-pubuler/{id}")]
        public async Task<ActionResult<string>> AddToPubuler([FromRoute]int id)
        {
           var result = await _product.GetProductByIdAsync(id);
           if(result == null) return BadRequest(); 
           result.PupulerItems = true;
           await db.SaveChangesAsync();
            return Ok("product added to pupuler Items");
        }

    
    }
}