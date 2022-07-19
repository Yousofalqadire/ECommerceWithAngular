using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string  FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDay { get; set; }
        public string City { get; set; }

        
    }
}