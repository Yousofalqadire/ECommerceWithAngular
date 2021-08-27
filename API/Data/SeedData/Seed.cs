using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.InterFaces;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data.SeedData
{
    public class Seed
    {
        public static async Task SeedAdmin(UserManager<ApplicationUser> userManager,
                                           RoleManager<IdentityRole> roleManager)
        {
            if( !userManager.Users.Any()){
 // var userData = await System.IO.File.ReadAllTextAsync("Data/JsonData/Register.json");
            // var user = JsonSerializer.Deserialize<RegisterDto>(userData);
            // if(user == null) return;
            
            ApplicationUser Admin = new ApplicationUser
            {
                UserName = "qadire333@yahoo.com",
               FirstName = "yousof",
               LastName = "qadire",
               Email = "qadire333@yahoo.com",
               City = "jarash",
               Age = 36
               
            };
          

             await userManager.CreateAsync(Admin,"Yousf@qa#1");
              IdentityRole role = new IdentityRole
           {
               Name = "Admin"
           };
           await roleManager.CreateAsync(role);
             await userManager.AddToRoleAsync(Admin, role.Name);
            }

           
        }

      
        
    }
}