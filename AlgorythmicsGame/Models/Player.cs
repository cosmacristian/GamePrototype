using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models
{
    public class Player
    {
        public string userId { get; set; } 
        public IClientProxy client { get; set; }

        public Player(string userId, IClientProxy client)
        {
            this.userId = userId;
            this.client = client;
        }
    }
}
