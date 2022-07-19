using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Sizes")]
    public class Size
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public byte Quantity { get; set; }

    }
}