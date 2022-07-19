namespace API.Helpers
{
    public class EmailConfigrations
    {
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool emailIsSSL { get; set; }
    }
}