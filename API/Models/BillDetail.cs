namespace API.Models
{
    public class BillDetail
    {
        public int Id { get; set; }
        public int BillId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string SelectedSize { get; set; }
        public double ProductPrice { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }

    }
}