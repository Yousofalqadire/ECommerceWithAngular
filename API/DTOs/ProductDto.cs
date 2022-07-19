using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class ProductDto
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; } 
        public double Price { get; set; }
        public string Details { get; set; }
        public IFormFile Image { get; set; }
        public List<string> Sizes { get; set; }
        public List<byte> Quantity { get; set; }
    }
}