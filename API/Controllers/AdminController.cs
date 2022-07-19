using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTOs;
using Api.Services;
using API.Data;
using API.DTOs;
using API.Extintions;
using API.Helpers;
using API.InterFaces;
using API.Models;
using API.Services;
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
        private readonly IUserRepository userRepository;
        public AdminController(ApplicationDbContext _db,
                   RoleManager<IdentityRole> _roleManager,
                   UserManager<ApplicationUser> _userManager,
                   IProductRepository product,
                   IUserRepository _userReposiory)
        {
            db = _db;
            roleManager = _roleManager;
            userManager = _userManager;
            _product = product;
            userRepository = _userReposiory;
        }

        [HttpPost("creat-role")]

        public async Task<ActionResult<AddRoleResponce>> CreatRole([FromBody]RoleDto model)
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
              if(result.Succeeded) return Ok(new AddRoleResponce{Responce="the role created successfuly"});
               foreach(var e in result.Errors)
               {
                    ModelState.AddModelError("", e.Description);
               }
            }
             return Ok(); 
        }

        [HttpGet("get-roles")]
        public async Task<ActionResult> GetRoles()
        {
            var result = await roleManager.Roles.ToListAsync();
            if(result == null) return BadRequest("ther are no roles");
            return Ok(result);
        }
        [AllowAnonymous]
        [HttpGet("git-users")]
        public async Task<ActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var users = await userRepository.GetUsersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage,users.PageSize,
            users.TotalCount,users.TotalPage);
            return Ok(users);
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

     [HttpGet("GetUsersNotInRole")]
     public async Task<ActionResult<IEnumerable<UserNotInRoleDto>>> GetUsersNotInRole([FromQuery]string id)
     {
         var usersNotInRole = new List<UserNotInRoleDto>();
         var result = await userManager.Users.ToListAsync();
         var role = await roleManager.FindByIdAsync(id);
         foreach(var u in result)
         {
             var userIsInRole = await userManager.IsInRoleAsync(u,role.Name);
             if(!userIsInRole )
             {
               usersNotInRole.Add(new UserNotInRoleDto{FirstName = u.FirstName,
               LastName = u.LastName, Email = u.Email,Id = u.Id});
             }
            
         }
         return Ok(usersNotInRole);
     }
     
     [HttpPost("add-user-to-role")]
     public async Task<ActionResult> AddUserToRole([FromBody] AddUserToRoleDto model)
     {
         var user = await userManager.FindByIdAsync(model.UserId);
         var role = await roleManager.FindByIdAsync(model.RoleId);
         IdentityResult result = await userManager.AddToRoleAsync(user,role.Name);
         if(!result.Succeeded)
         {
             return BadRequest("user not added to this role!");
         }

         return Ok(new AddToRoleResponce{Response="user added to this role "});
     }


     [HttpDelete("delete-role")]
     public async Task<ActionResult> deleteRole([FromQuery]string id)
     {
         var role = await roleManager.FindByIdAsync(id);
         IdentityResult result = await roleManager.DeleteAsync(role);
         if(result.Succeeded)
         {
             return Ok(new RemoveRoleResponce{Responce="the role deleted successfuly"});
         }
         foreach(var error in result.Errors)
         {
             return BadRequest(new RemoveRoleResponce{Responce=$"{error.Description}"});
         }
         return Ok();
     }

    }
}