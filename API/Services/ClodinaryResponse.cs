namespace API.Services
{
    public class ClodinaryResponse
    {
        public ClodinaryResponse(string response)
        {
            this.Response = response;

        }
        public string Response { get; set; }
        
    }
}