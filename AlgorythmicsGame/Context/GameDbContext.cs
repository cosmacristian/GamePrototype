using AlgorythmicsGame.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class GameDbContext : IdentityDbContext<ApplicationUser>
    {
        public GameDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<OrganizedMatch> Matches { get; set; }
        public DbSet<OrganizedSingleMatch> SinglePlayerMatches { get; set; }
        public DbSet<OrganizedMultiMatch> MultiPlayerMatches { get; set; }
        public DbSet<Algorithm> Algorithms { get; set; }
        public DbSet<GeneralPlayerStatistics> PlayerStatistics { get; set; }
        public DbSet<PlayerStatisticsForAlgorithms> PlayerStatisticsPerAlgorithms { get; set; }
        public DbSet<GameBadges> GameBadges { get; set; }
        public DbSet<GameBadgesForPlayers> GameBadgesForPlayers { get; set; }
    }
}
