using System.Collections.Generic;
using API.Models;

namespace API.DTOs
{
    public class BillDetailsDto
    {
        public Bill bill{get; set;}
        public List<BillDetail> details{get; set;}
    }
}