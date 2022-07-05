using AlgorythmicsGame.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class GeneralPlayerStatistics
    {
        [Key]
        [ForeignKey("ApplicationUser")]
        public string PlayerStatisticsId { get; set; }

        [ForeignKey("ApplicationUser")]
        public virtual ApplicationUser Player { get; set; }

        [Column("Points", TypeName = "bigint")]
        public int points { get; set; }

        [Column("LastMatchPlayed", TypeName = "date")]
        public DateTime lastMatchDate { get; set; }

        public List<PlayerStatisticsForAlgorithms> StatisticsForAlgorithms { get; set; }

        public GeneralPlayerStatistics()
        {
                
        }

        public GeneralPlayerStatistics(ApplicationUser user)
        {
            PlayerStatisticsId = user.Id;
            points = 0;
            Player = user;
            StatisticsForAlgorithms = new List<PlayerStatisticsForAlgorithms>();
        }

        public void registerAnAlgorithm(PlayerStatisticsForAlgorithms newAlgorithmStats)
        {
            StatisticsForAlgorithms.Add(newAlgorithmStats);
        }

        public void addVictory(int AlgorithmId)
        {
            points = points + 100;
            lastMatchDate = DateTime.Now;
            PlayerStatisticsForAlgorithms algorithmStats = StatisticsForAlgorithms.FirstOrDefault(x => x.AlgorithmId == AlgorithmId);
            algorithmStats.addVictory();
        }

        public void addDefeat(int AlgorithmId)
        {
            points = points + 10;
            lastMatchDate = DateTime.Now;
            PlayerStatisticsForAlgorithms algorithmStats = StatisticsForAlgorithms.FirstOrDefault(x => x.AlgorithmId == AlgorithmId);
            algorithmStats.addDefeat();
        }

        public void addRenunciation(int AlgorithmId)
        {
            if (points >= 100)
            {
                points = points - 100;
            }
            else
            {
                points = 0;
            }
            lastMatchDate = DateTime.Now;
            PlayerStatisticsForAlgorithms algorithmStats = StatisticsForAlgorithms.FirstOrDefault(x => x.AlgorithmId == AlgorithmId);
            algorithmStats.addDefeat();
        }
    }
}
