using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Data.SeedData;
using API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
          var host= CreateHostBuilder(args).Build();
         using var scope = host.Services.CreateScope();
         var services = scope.ServiceProvider;
         try
         {
             var context = services.GetRequiredService<ApplicationDbContext>();
             var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
             var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
             await context.Database.MigrateAsync();
             await Seed.SeedAdmin(userManager,roleManager); 
             
         }
         catch (Exception ex)
         {
             
             var logger = services.GetRequiredService<ILogger<Program>>();
             logger.LogError(ex,"Ann Error occurres While Migration");
         }
          await host.RunAsync() ;
          

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
