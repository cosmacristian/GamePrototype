﻿using AlgorythmicsGame.Models;
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

        [Required]
        [Column("PlayersWaiting", TypeName = "tinyint")]
        public int PlayersWaiting { get; private set; }


        [DataType(DataType.Text)]
        [Display(Name = "HostPlayerId")]
        [StringLength(50, ErrorMessage = "The name should be less then 50 characters")]
        public string player1 { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "GuestPlayerId")]
        [StringLength(50, ErrorMessage = "The name should be less then 50 characters")]
        public string player2 { get; set; }

        private OrganizedMatch()
        {

        }

        public OrganizedMatch(string OrganizerPlayerId)
        {
            Status = 1;
            player1 = OrganizerPlayerId;
            PlayersWaiting = 1;
        }

        public void joinMatch(string GuestPlayerId)
        {
            if (PlayersWaiting < 2)
            {
                player2 = GuestPlayerId;
                PlayersWaiting += 1;
                Status = 2;
            }
            else
            {
                throw new OperationCanceledException("Player limit reached!");
            }
        }

        public void finishMatch()
        {
            Status = 3;
        }
    }
}
