using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RoleDto
    {
        [Required]
        public string RoleName { get; set; }
    }
}