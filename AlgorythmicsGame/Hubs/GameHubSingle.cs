using AlgorythmicsGame.Context;
using AlgorythmicsGame.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Hubs
{
    public class GameHubSingle : Hub
    {

        private readonly GameDbContext _context;
        private static Random rng = new Random();

        public GameHubSingle(GameDbContext context)
        {
            _context = context;
        }

        //static int idCounter = 0;
        static Dictionary<string, Player> players = new Dictionary<string, Player>();
        //static Queue<Player> waitingPlayers = new Queue<Player>();
        //Dictionary<>
        //static List<Tuple<Player, Player>> games = new List<Tuple<Player, Player>>();

        public async Task finished(string userId, int matchId, TimeSpan newTime)
        {
            if (userId.Equals(""))
                throw new Exception("Error something went wrong at user id!");
            Player winner = null;
            //Player other = null;
            OrganizedSingleMatch match = _context.SinglePlayerMatches.Where(t => t.MatchId == matchId).FirstOrDefault();
            if (match == null)
                throw new Exception("Error something went wrong at metch retriaval!");
            players.TryGetValue(match.player1, out winner);
            _context.SinglePlayerMatches.Remove(match);

            if (winner == null)
                throw new Exception("Error at the end");

            GeneralPlayerStatistics winnerStatistics = null;
            //GeneralPlayerStatistics loserStatistics = null;
            TimeSpan oldTime;
            string winMessage = "You finished the practice!";

            if (winner.authenticatedUserId != null && !winner.authenticatedUserId.Equals(""))
            {
                winnerStatistics = await PreparePlayerStatistics(winner, match);
                oldTime = winnerStatistics.addSinglePlayerVictory(match.AlgorithmId, newTime);
                if (oldTime != newTime)
                {
                    winMessage += "\nNew personal best! Old:" + oldTime.ToString() + "\n New:" + newTime.ToString();
                }
            }

            var send0 = _context.SaveChangesAsync();
            
            var send1 = winner.client.SendAsync("winner", winMessage);
            
            await Task.WhenAll(send0, send1);

            if (winner.authenticatedUserId != null && !winner.authenticatedUserId.Equals(""))
            {
                await CheckAchievements(winnerStatistics);
            }

            await _context.SaveChangesAsync();
        }

        public async Task waiting(int arraySize, Models.Enums.AlgorithmType algorithmType, int matchId, string authenticatedUserID)
        {
            Player player = new Player(Context.ConnectionId, Clients.Caller, authenticatedUserID);
            
            players.Add(Context.ConnectionId, player);

            OrganizedSingleMatch match = _context.SinglePlayerMatches.Where(a => a.MatchId == matchId).FirstOrDefault();
            if (match == null)
                throw new Exception("Something went wrong at match");
            match.joinMatch(Context.ConnectionId);
            await _context.SaveChangesAsync();
            List<int> arrayToSort = new List<int>();
            int valueToSearchFor = -1;
            String arrayToSortStr = "";
            if (match.InputType != Models.Enums.InputType.TeacherInput)
            {
                for (int arrayIndex = 1; arrayIndex <= match.ArraySize; arrayIndex++)
                    arrayToSort.Add(arrayIndex);
                if (match.InputType == Models.Enums.InputType.RandomInput)
                    arrayToSort = arrayToSort.OrderBy(i => rng.Next()).ToList();
                if (match.InputType == Models.Enums.InputType.WorstCaseScenario)
                    arrayToSort = arrayToSort.OrderByDescending(i => i).ToList();
                arrayToSortStr = String.Join(",", arrayToSort.ToArray());

                if(algorithmType == Models.Enums.AlgorithmType.Searching)
                {
                    valueToSearchFor = arrayToSort[rng.Next(0, match.ArraySize)];
                }
            }
            var player1 = player.client.SendAsync("getReady", player.userId, match.MatchId, arrayToSortStr, valueToSearchFor);
            
            await Task.WhenAll(player1);
        }

        public async Task renounce(int matchId, string userId)
        {
            OrganizedSingleMatch match = _context.SinglePlayerMatches.Where(t => t.MatchId == matchId).FirstOrDefault();
            if (match == null)
                throw new Exception("Error something went wrong at metch retriaval!");
            
            _context.SinglePlayerMatches.Remove(match);
            await _context.SaveChangesAsync();
        }

        public async Task<GeneralPlayerStatistics> PreparePlayerStatistics(Player player, OrganizedSingleMatch match)
        {
            GeneralPlayerStatistics playerStatistics = null;
            playerStatistics = await _context.PlayerStatistics
                    .Include(m => m.StatisticsForAlgorithms)
                    .FirstOrDefaultAsync(x => x.PlayerStatisticsId == player.authenticatedUserId);

            if (playerStatistics == null)
            {
                ApplicationUser AppUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == player.authenticatedUserId);
                GeneralPlayerStatistics newStat = new GeneralPlayerStatistics(AppUser);
                _context.PlayerStatistics.Add(newStat);
                //await _context.SaveChangesAsync();
                playerStatistics = newStat;
            }
            bool hasAlgoStats = playerStatistics.StatisticsForAlgorithms.Any(x => x.AlgorithmId == match.AlgorithmId);
            if (!hasAlgoStats)
            {
                Algorithm algorithm = await _context.Algorithms.FirstOrDefaultAsync(x => x.Id == match.AlgorithmId);
                PlayerStatisticsForAlgorithms newAlgoStats = new PlayerStatisticsForAlgorithms(playerStatistics, algorithm);
                _context.PlayerStatisticsPerAlgorithms.Add(newAlgoStats);
            }
            return playerStatistics;
        }

        public async Task CheckAchievements(GeneralPlayerStatistics userStats)
        {
            var availableBadges = await _context.GameBadges
            .Where(c => !_context.GameBadgesForPlayers
                .Where(x => x.PlayerId == userStats.PlayerStatisticsId)
                .Select(b => b.BadgeId)
                .Contains(c.BadgeId)
            ).ToListAsync();
            foreach (var badge in availableBadges)
            {
                string query = "select Points,AlgorithmId,VictoryCount,LoseCount,SinglePlayerCount,BestTimeRecord  "
                                + "from PlayerStatistics a "
                                + "join PlayerStatisticsPerAlgorithms b "
                                + "on a.PlayerStatisticsId = b.PlayerId "
                                + "where PlayerStatisticsId = '" + userStats.PlayerStatisticsId + "' "
                                + badge.Condititon;
                bool condition = await _context.GameBadges.FromSql(query).AnyAsync();
                if (condition)
                {
                    GameBadgesForPlayers AchievementUnlocked = new GameBadgesForPlayers(badge, userStats);
                    _context.GameBadgesForPlayers.Add(AchievementUnlocked);
                }
            }
        }

    }
}
