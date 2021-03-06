using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class PresenceTracker
    {
        private static readonly Dictionary<string,List<string>> OnlineUser =
        new Dictionary<string, List<string>>();
        public Task OnConnectid(string username,string connectionId)
        {
            lock(OnlineUser)
            {
                if(OnlineUser.ContainsKey(username))
                {
                    OnlineUser[username].Add(connectionId);
                }
                else
                {
                    OnlineUser.Add(username,new List<string>{connectionId});
                }
            }
            return Task.CompletedTask;
            
        }
        public Task OnDisConnected(string username,string connectionId)
        {
            lock(OnlineUser)
            {
                if(!OnlineUser.ContainsKey(username)) return Task.CompletedTask;
                OnlineUser[username].Remove(connectionId);
                if(OnlineUser[username].Count == 0)
                {
                    OnlineUser.Remove(username);
                }
            }
            return Task.CompletedTask;
        }

        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;
            lock(OnlineUser)
            {
                onlineUsers = OnlineUser.OrderBy(k=> k.Key).Select(k=> k.Key).ToArray();
            }
            return Task.FromResult(onlineUsers);
        }
    }
}