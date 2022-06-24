using AlgorythmicsGame.Context;
using AlgorythmicsGame.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Hubs
{
    public class GameHub : Hub
    {

        private readonly GameDbContext _context;

        public GameHub(GameDbContext context)
        {
            _context = context;
        }

        //static int idCounter = 0;
        static Dictionary<string, Player> players = new Dictionary<string, Player>();
        //static Queue<Player> waitingPlayers = new Queue<Player>();
        //Dictionary<>
        //static List<Tuple<Player, Player>> games = new List<Tuple<Player, Player>>();

        public async Task finished(string userId, int matchId)
        {
            if(userId.Equals(""))
                throw new Exception("Error something went wrong at user id!");
            Player winner = null;
            Player other = null;
            OrganizedMatch match = _context.Matches.Where(t => t.MatchId == matchId).FirstOrDefault();
            if(match == null)
                throw new Exception("Error something went wrong at metch retriaval!");
            if (match.player1 == userId){
                players.TryGetValue(match.player1,out winner);
                players.TryGetValue(match.player2, out other);
            }
            else{
                players.TryGetValue(match.player1, out other);
                players.TryGetValue(match.player2, out winner);
            }
            _context.Matches.Remove(match);
            var send0 =_context.SaveChangesAsync();
            if (winner == null || other == null)
                throw new Exception("Error at the end");

            var send1 = winner.client.SendAsync("winner", "You won!");
            var send2 = other.client.SendAsync("winner", "You lose!");
            

            await Task.WhenAll(send0, send1, send2);
        }

        public async Task waiting(int arraySize, Models.Enums.InputType inputType, int matchId)
        {
            Player player = new Player(Context.ConnectionId, Clients.Caller);
            Player partner;
            
            players.Add(Context.ConnectionId, player);
            
            OrganizedMatch match = _context.Matches.Where(a => a.MatchId == matchId).FirstOrDefault();
            if(match == null)
                throw new Exception("Something went wrong at match");
            match.joinMatch(Context.ConnectionId);
            await _context.SaveChangesAsync();
            if (match.Status == 2)
            {
                if (players.TryGetValue(match.player1, out partner))
                {
                    var setup = _context.SaveChangesAsync();
                    List<int> arrayToSort = new List<int>(); 
                    String arrayToSortStr = "";
                    if (inputType != Models.Enums.InputType.TeacherInput)
                    {
                        Random rnd = new Random();
                        for (int arrayIndex = 0; arrayIndex < match.ArraySize; arrayIndex++)
                            arrayToSort.Add(rnd.Next(1, 9));
                        if (inputType == Models.Enums.InputType.BestCaseScenario)
                            arrayToSort = arrayToSort.OrderBy(i => i).ToList();
                        if (inputType == Models.Enums.InputType.WorstCaseScenario)
                            arrayToSort = arrayToSort.OrderByDescending(i => i).ToList();
                        arrayToSortStr = String.Join(",", arrayToSort.ToArray());
                    }
                    var player1 = player.client.SendAsync("getReady", player.userId, match.MatchId, arrayToSortStr);
                    var player2 = partner.client.SendAsync("getReady", partner.userId, match.MatchId, arrayToSortStr);

                    await Task.WhenAll(setup, player1, player2);
                }
                else
                {
                    throw new Exception("Something went wrong at player setup");
                }
            }
            
        }
    }
}
