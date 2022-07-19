using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("CuroselPhotos")]
    public class CuroselPhoto 
    {
         public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public Curosel Curosel { get; set; }
        public int CuroselId { get; set; }

    }
}