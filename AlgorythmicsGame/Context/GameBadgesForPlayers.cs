using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class GameBadgesForPlayers
    {
        [Key]
        public int AchievementId { get; set; }

        public string PlayerId { get; set; }
        public GeneralPlayerStatistics Player { get; set; }

        public int BadgeId { get; set; }
        public GameBadges Badge { get; set; }

        public DateTime ReceivedOn { get; set; }

        public bool UserWasNotified { get; set; }

        public GameBadgesForPlayers()
        {
               
        }

        public GameBadgesForPlayers(GameBadges badge, GeneralPlayerStatistics playerStats)
        {
            this.Badge = badge;
            this.BadgeId = badge.BadgeId;
            this.Player = playerStats;
            this.PlayerId = playerStats.PlayerStatisticsId;
            this.ReceivedOn = DateTime.Now;
            this.UserWasNotified = false;
        }

    }
}
