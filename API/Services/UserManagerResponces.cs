using System;
using System.Collections.Generic;

namespace API.Services
{
   public class UserManagerResponces
{
    public string Massege { get; set; }
    public bool ?IsSucceded { get; set; } = true;
    public List<string> Errors { get; set; }
    public string Token  { get; set; }
    public string UserName  { get; set; }
    public DateTime ExpireDate { get; set; }
    public List<string> Roles { get; set; }

   

}
}