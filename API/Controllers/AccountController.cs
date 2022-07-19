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
using API.InterFaces;
using System.Web;
using API.Reposotory;
using Microsoft.Extensions.Options;
using API.Helpers;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.WebUtilities;

namespace API.Controllers
{
    [ApiController]
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configration;
        private readonly IEmailService emailService;
        private readonly EmailRepository email;
        private readonly IOptions<ForgotPassword> options;

        public AccountController(UserManager<ApplicationUser> _userManager,
         IConfiguration _configration ,
         RoleManager<IdentityRole> _roleManager,
         IEmailService _emailService,EmailRepository _email,IOptions<ForgotPassword> _options )
        {
           this.userManager = _userManager; 
           this.configration = _configration;
           this.roleManager = _roleManager;
           this.emailService = _emailService;
            this.email = _email;
            this.options = _options;
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
                      BirthDay = model.BirthDay,
                      City = model.City,
                      
                    };
                    var result = await userManager.CreateAsync(user,model.Password);                    
                    if (result.Succeeded)
                    {  
                        var ConfirmEmail = await userManager.GenerateEmailConfirmationTokenAsync(user);
                        var ConfirmUrl = Url.ActionLink("EmailConfirmation","Account", 
                        new{Id = user.Id,Token =HttpUtility.UrlEncode(ConfirmEmail)},Request.Scheme);
                        var str = '"'+ConfirmUrl+ '"';
                        var HtmlContent ="<a href='"+ConfirmUrl+"'>"+"confirm email"+"</a>";
                        email.SendEmail(user.Email,"email cofirmation",HtmlContent);                   
                       return Ok(new UserManagerResponces{IsSucceded = true,Massege="the acount creted successfuly"});
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
                new Claim(ClaimTypes.NameIdentifier,user.Id)
                               
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

                    email.SendEmail(user.Email,
                    "logging confirmation",
                    "<h3> welcom back "+ user.FirstName+"<h3>");

            return Ok(new UserManagerResponces{UserName = user.Email,
                                               Token = TokenAsString,
                                               ExpireDate = token.ValidTo,
                                               Massege = "you are loging",
                                              
                                            });
        }

        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmation(string Id,string Token)
        {
            if(string.IsNullOrEmpty(Id) || string.IsNullOrEmpty(Token)) return NotFound();
            var user = await userManager.FindByIdAsync(Id);
            if(user == null) return NotFound();

        var result =  await userManager.ConfirmEmailAsync(user, HttpUtility.UrlDecode(Token));
             if(result.Succeeded)
             {
                email.SendEmail(user.Email,
                "registration confirm","<h2> your registeration confirmed</h2>");
                
             }
             else
             {
                 return BadRequest("this email not found");
             }

           return Ok(new UserManagerResponces{IsSucceded = true,Massege="register confirmed"});
        }

        [HttpPost("ForgetPassword")]
        public async Task<ActionResult> ForgetPassword([FromBody] ForgetPasswordDto forgetPasswordDto)
        {
            if(!ModelState.IsValid) return BadRequest();
            var user = await userManager.FindByEmailAsync(forgetPasswordDto.Email);
            if(user == null) return NotFound();
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
           var clientUrl = "https://alsuweadishop.herokuapp.com/home/updatePassword/";

          var param = new Dictionary<string,string>
          {
             {"token",token},
             {"email",forgetPasswordDto.Email}

          };
           
         var callback = QueryHelpers.AddQueryString(clientUrl,param);

          email.SendEmail(forgetPasswordDto.Email,"reset password",callback);
           
            return Ok(new UserManagerResponces{IsSucceded = true,Massege="please check your email we send the token"});
        }

        [HttpPost("update-password")]
        public async Task<ActionResult<string>> UpdatePassword([FromBody]UpdatePassworDto model)
        {
           if(!ModelState.IsValid) return BadRequest();
           var user = await userManager.FindByEmailAsync(model.Email);
           if(user == null) return NotFound();
           var result = await userManager.ResetPasswordAsync(user,model.Token,model.Password);
            if(!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new {Errors = errors});
            }
            
            return Ok(new UserManagerResponces{IsSucceded= true,
            Massege = "please go back to home page and login with new password"});
        }
       
    }
}

// var link = "<a href='http://localhost:4200/home/updatePassword/"+user.Email+"'>"+
//            "click here to rest password</a>";
    
//              email.SendEmail(forgetPasswordDto.Email,"reset password",link);