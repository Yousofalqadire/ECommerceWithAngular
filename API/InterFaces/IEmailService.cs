using System;
using System.Threading.Tasks;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace API.InterFaces
{
    public interface IEmailService
    {

         Task SendEmailAsync(string ToEmail,string Subject,string Content,string htmlContent);
    }
      public class EmailService : IEmailService
    {
        private readonly IOptions<EmailSetting> configration;

        public EmailService(IOptions<EmailSetting> _config)
        {
           configration = _config;
        }

        public async Task SendEmailAsync(string ToEmail, string Subject, string Content ,string htmlContent)
        {
            var apiKey = configration.Value.sendGridApiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("alqadryywsf@gmail.com", "Alsuwaide Wears");
            var subject = Subject;
            var to = new EmailAddress(ToEmail,"alsuweadi Wears");
            var plainTextContent = Content;
            var msg = MailHelper.CreateSingleEmail(from, to, subject,plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

       
    }
}