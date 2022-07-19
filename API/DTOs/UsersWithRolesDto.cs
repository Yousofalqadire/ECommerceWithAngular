using System.Collections.Generic;

namespace API.DTOs
{
    public class UsersWithRolesDto
    {
        public string UserName { get; set; }
        public string UserId { get; set; }
        public List<string> Roles { get; set; }
        public string BirthDay { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string Email { get; set; }
    }
}