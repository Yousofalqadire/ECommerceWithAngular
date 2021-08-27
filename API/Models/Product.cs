using System.Collections.Generic;

namespace API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; } 
        public double Price { get; set; }
        public string Details { get; set; }
        public Photo Photo { get; set; }
        public List<Size> Sizes { get; set; }
    }
}