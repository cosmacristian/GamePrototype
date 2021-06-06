using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models
{
    public class Player
    {
        public String username { get; set; } 
        public IClientProxy client { get; set; }

        public Player(String username, IClientProxy client)
        {
            this.username = username;
            this.client = client;
        }
    }
}
