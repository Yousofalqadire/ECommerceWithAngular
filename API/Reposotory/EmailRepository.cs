using API.Helpers;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace API.Reposotory
{
    public  class EmailRepository
    {
    
        private readonly IOptions<EmailConfigrations> config;

        public EmailRepository(IOptions<EmailConfigrations> config)
        {
           this.config = config;
        }
        public void  SendEmail(string to , string subject, string body)
        {
            
            MailAddress _to = new MailAddress(to);
            MailAddress from = new MailAddress(config.Value.From,"Alsuweadi wears");
            MailMessage message = new MailMessage(from,_to);
            message.IsBodyHtml = true;
            message.Subject = subject;
            message.Body = body;
            SmtpClient smtpClient = new SmtpClient()
            {
                Host = config.Value.SmtpServer,
                Port = config.Value.Port,
                Credentials = new NetworkCredential(config.Value.Username,config.Value.Password),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Timeout = 20000

            };
            smtpClient.Send(message);
            

        }

    }
}