using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet <Bill> Bills{ get; set; }
        public DbSet <BillDetail> BillDetails{ get; set; }
        public DbSet<Curosel> Curosels { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}