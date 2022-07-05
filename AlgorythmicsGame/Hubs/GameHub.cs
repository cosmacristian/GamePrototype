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
    public class GameHub : Hub
    {

        private readonly GameDbContext _context;
        private static Random rng = new Random();

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
            if (userId.Equals(""))
                throw new Exception("Error something went wrong at user id!");
            Player winner = null;
            Player other = null;
            OrganizedMatch match = _context.Matches.Where(t => t.MatchId == matchId).FirstOrDefault();
            if (match == null)
                throw new Exception("Error something went wrong at metch retriaval!");
            if (match.player1 == userId)
            {
                players.TryGetValue(match.player1, out winner);
                players.TryGetValue(match.player2, out other);
            }
            else
            {
                players.TryGetValue(match.player1, out other);
                players.TryGetValue(match.player2, out winner);
            }
            _context.Matches.Remove(match);

            if (winner == null || other == null)
                throw new Exception("Error at the end");

            GeneralPlayerStatistics winnerStatistics = null;
            GeneralPlayerStatistics loserStatistics = null;

            if (winner.authenticatedUserId != null && !winner.authenticatedUserId.Equals(""))
            {
                winnerStatistics = await PreparePlayerStatistics(winner, match);
                winnerStatistics.addVictory(match.AlgorithmId);
            }

            if (other.authenticatedUserId != null && !other.authenticatedUserId.Equals(""))
            {
                loserStatistics = await PreparePlayerStatistics(other, match);
                loserStatistics.addDefeat(match.AlgorithmId);
            }

            var send0 = _context.SaveChangesAsync();
            var send1 = winner.client.SendAsync("winner", "You won!");
            var send2 = other.client.SendAsync("winner", "You lose!");
            
            await Task.WhenAll(send0, send1, send2);

            if (winner.authenticatedUserId != null && !winner.authenticatedUserId.Equals(""))
            {
                await CheckAchievements(winnerStatistics);
            }

            if (other.authenticatedUserId != null && !other.authenticatedUserId.Equals(""))
            {
                await CheckAchievements(loserStatistics);
            }
            await _context.SaveChangesAsync();
        }

        public async Task waiting(int arraySize, Models.Enums.AlgorithmType algorithmType, int matchId, string authenticatedUserID)
        {
            Player player = new Player(Context.ConnectionId, Clients.Caller, authenticatedUserID);
            Player partner;

            players.Add(Context.ConnectionId, player);

            OrganizedMatch match = _context.Matches.Where(a => a.MatchId == matchId).FirstOrDefault();
            if (match == null)
                throw new Exception("Something went wrong at match");
            match.joinMatch(Context.ConnectionId);
            await _context.SaveChangesAsync();
            if (match.Status == 2)
            {
                if (players.TryGetValue(match.player1, out partner))
                {
                    var setup = _context.SaveChangesAsync();
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
                    var player2 = partner.client.SendAsync("getReady", partner.userId, match.MatchId, arrayToSortStr, valueToSearchFor);

                    await Task.WhenAll(setup, player1, player2);
                }
                else
                {
                    throw new Exception("Something went wrong at player setup");
                }
            }

        }

        public async Task renounce(int matchId, string userId)
        {
            Player winner = null;
            Player other = null;
            OrganizedMatch match = _context.Matches.Where(t => t.MatchId == matchId).FirstOrDefault();
            if (match == null)
                throw new Exception("Error something went wrong at metch retriaval!");
            if (!userId.Equals(""))
            {
                if (match.player1 == userId)
                {
                    players.TryGetValue(match.player1, out other);
                    players.TryGetValue(match.player2, out winner);
                }
                else
                {
                    players.TryGetValue(match.player1, out winner);
                    players.TryGetValue(match.player2, out other);
                }
                if (winner == null || other == null)
                    throw new Exception("Error at the end");

                GeneralPlayerStatistics loserStatistics = null;

                if (other.authenticatedUserId != null && !other.authenticatedUserId.Equals(""))
                {
                    loserStatistics = await PreparePlayerStatistics(other, match);
                    loserStatistics.addRenunciation(match.AlgorithmId);
                }

                var send1 = winner.client.SendAsync("winner", "Your opponent left the game!");
                var send2 = other.client.SendAsync("winner", "You lose!");
                await Task.WhenAll(send1, send2);
            }
            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();
        }

        public async Task<GeneralPlayerStatistics> PreparePlayerStatistics(Player player, OrganizedMatch match)
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
