using AlgorythmicsGame.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Hubs
{
    public class ClickerHub : Hub
    {
        static Dictionary<String, Player> players= new Dictionary<string, Player>();
        static Queue<Player> waitingPlayers = new Queue<Player>();
        //Dictionary<>
        static List<Tuple<Player, Player>> games = new List<Tuple<Player, Player>>();
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task finished(string user)
        {
            Player winner=null;
            Player other=null;
            foreach(var pairs in games)
            {
                if (pairs.Item1.username == user)
                {
                    winner = pairs.Item1;
                    other = pairs.Item2;
                    games.Remove(pairs);
                    break;
                }
                if (pairs.Item2.username == user)
                {
                    other = pairs.Item1;
                    winner = pairs.Item2;
                    games.Remove(pairs);
                    break;
                }
            }
            if(winner == null || other == null )
                throw new Exception("Error at the end");

            var send1 = winner.client.SendAsync("winner", winner.username);
            var send2 = other.client.SendAsync("winner", winner.username);

            await Task.WhenAll(send1, send2);
        }

        public async Task waiting(string user)
        {
            if (players.ContainsKey(user))
                throw new Exception("Select different Name");
            Player player = new Player(user, Clients.Caller);
            Player partner;
            players.Add(user,player);
            if (waitingPlayers.Count <= 0)
            {
                waitingPlayers.Enqueue(player);
                await player.client.SendAsync("standBy");
            }
            else
            {
                partner = waitingPlayers.Dequeue();
                Tuple<Player, Player> pairUp = new Tuple<Player, Player>(player, partner);
                games.Add(pairUp);
                var player1 = player.client.SendAsync("getReady", player.username, partner.username);
                var player2 = partner.client.SendAsync("getReady", player.username, partner.username);

                await Task.WhenAll(player1, player2);
            }
        }
    }
}
