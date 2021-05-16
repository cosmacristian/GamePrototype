using AlgorythmicsGame.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{

    public class OrganizedMatch
    {
        [Required]
        [Key]
        public int MatchId { get; set; }

        [Required]
        [Column("Type", TypeName = "tinyint")]
        public int Status { get; set; }

        public int PlayersWaiting { get; private set; }

        public OrganizedMatch()
        {
            Status = 1;
            PlayersWaiting = 1;
        }

        public void joinMatch()
        {
            PlayersWaiting += 1;
        }
    }
}
