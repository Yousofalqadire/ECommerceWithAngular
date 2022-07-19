using System;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Extintions;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;


namespace API.SignalR
{
    [Authorize]
    public class presenceHub : Hub
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly PresenceTracker tracker;

        public presenceHub(UserManager<ApplicationUser> userManager,
                           IHttpContextAccessor _httpContextAccessor,
                           PresenceTracker _tracker)
        {
            this.httpContextAccessor = _httpContextAccessor;
            this.tracker = _tracker;
            this.userManager = userManager;
        }

        public override async Task OnConnectedAsync()
        {
            
            var user = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
             var _user = await userManager.FindByIdAsync(user);
             await tracker.OnConnectid(_user.UserName,httpContextAccessor.HttpContext.Connection.Id);

            await Clients.Others.SendAsync("UserIsOnline", _user.FirstName);

            var currentUsers = await tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers",currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
                 var user = httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
             var _user = await userManager.FindByIdAsync(user);
             await tracker.OnDisConnected(_user.UserName,httpContextAccessor.HttpContext.Connection.Id);
            await Clients.Others.SendAsync("UserIsOffline",_user.FirstName);

              var currentUsers = await tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers",currentUsers);
            
            await base.OnDisconnectedAsync(exception);


        }

    }
}