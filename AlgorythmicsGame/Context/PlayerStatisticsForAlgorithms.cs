using AlgorythmicsGame.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class PlayerStatisticsForAlgorithms
    {
        [Key]
        public int StatisticId { get; set; }

        public string PlayerId { get; set; }
        public GeneralPlayerStatistics Player { get; set; }

        public int AlgorithmId { get; set; }
        public Algorithm Algorithm { get; set; }

        [Column("VictoryCount", TypeName = "int")]
        public int victories { get; set; }

        [Column("LoseCount", TypeName = "int")]
        public int loses { get; set; }

        [Column("SinglePlayerCount", TypeName = "int")]
        public int singlePlays { get; set; }

        [Column("LastMatchPlayed", TypeName = "date")]
        public DateTime lastMatchDate { get; set; }

        [Column("BestTimeRecord", TypeName = "time")]
        public TimeSpan bestTimeRecord { get; set; }

        public PlayerStatisticsForAlgorithms()
        {

        }

        public PlayerStatisticsForAlgorithms(GeneralPlayerStatistics playerStats, Algorithm algorithm)
        {
            PlayerId = playerStats.PlayerStatisticsId;
            Player = playerStats;
            playerStats.registerAnAlgorithm(this);
            AlgorithmId = algorithm.Id;
            Algorithm = algorithm;
            victories = 0;
            loses = 0;
            singlePlays = 0;
        }

        public void addVictory()
        {
            victories = victories + 1;
            lastMatchDate = DateTime.Now;
        }

        public void addDefeat()
        {
            loses = loses + 1;
            lastMatchDate = DateTime.Now;
        }
    }
}
