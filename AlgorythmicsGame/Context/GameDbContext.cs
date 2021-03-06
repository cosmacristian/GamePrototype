using AlgorythmicsGame.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class GameDbContext : DbContext
    {
        public GameDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<OrganizedMatch> Matches { get; set; }
        public DbSet<Algorithm> Algorithms { get; set; }
    }
}
