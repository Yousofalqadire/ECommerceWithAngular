namespace API.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int  ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPric { get; set; }
        public string SelectedSize { get; set; }
        public int Quantity { get; set; }
        public string ProductPhoto { get; set; }
        public string User { get; set; }
        
        
    }
}