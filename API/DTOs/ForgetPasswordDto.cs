using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ForgetPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        // public string ClientURL { get; set; }
    }
}