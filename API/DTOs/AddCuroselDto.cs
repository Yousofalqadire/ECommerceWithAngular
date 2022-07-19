using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class AddCuroselDto
    {
        public int Id { get; set; }
        public string CapationText { get; set; }
        public IFormFile Photo { get; set; }
    }
}