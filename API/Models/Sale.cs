using System;

namespace API.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}