using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Models;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/{Controller}")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configration;
        public AccountController(UserManager<ApplicationUser> _userManager,
         IConfiguration _configration ,
         RoleManager<IdentityRole> _roleManager )
        {
           this.userManager = _userManager; 
           this.configration = _configration;
           this.roleManager = _roleManager;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserManagerResponces>> Register(RegisterDto model)
        {
            if(ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if(user != null) return new UserManagerResponces{Massege="the username was token pleas try anothe or login"};
               else if(user == null)
                {
                    user = new ApplicationUser
                    {
                      Email = model.Email,
                      UserName = model.Email,
                      FirstName = model.FirstName,
                      LastName = model.LastName,
                      Age = model.Age,
                      City = model.City
                    };
                    var result = await userManager.CreateAsync(user,model.Password);
                     var role = new IdentityRole{Name = "Member"};
                     await roleManager.CreateAsync(role);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user,role.Name);
                        return new UserManagerResponces
                        {
                            IsSucceded = true,
                            Massege = "the account was created successfuly"
                        };
                        
                     

                    }
                    return new UserManagerResponces
                    {
                        IsSucceded = false,
                        Massege = "the account was not created"
                    };
                }
             
            }
            
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserManagerResponces>> Login(LoginDto model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if(user == null) return BadRequest("this user name not exist do you have account?");             
             var result = await userManager.CheckPasswordAsync(user,model.Password);
             if(!result) return BadRequest("invalid password");
           
            var claims = new List<Claim>()
            {
                new Claim("email",model.Email),
                new Claim("username",model.Email),
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                               
            };
            
           var roles = await userManager.GetRolesAsync(user);
             claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role,role))); 
                     
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configration["AuthSetting:Key"]));
             var token = new JwtSecurityToken(
                      issuer: configration["AuthSetting:Issur"],
                      audience: configration["AuthSetting:Audience"],
                      claims: claims,
                      expires:System.DateTime.Now.AddDays(30),
                      signingCredentials : new SigningCredentials(Key,SecurityAlgorithms.HmacSha256));
                     var TokenAsString = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new UserManagerResponces{UserName = user.Email,
                                               Token = TokenAsString,
                                               ExpireDate = token.ValidTo,
                                               Massege = "you are loging",
                                              
                                            });
        }
    }
}