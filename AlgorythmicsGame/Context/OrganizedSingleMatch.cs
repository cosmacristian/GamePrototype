using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class OrganizedSingleMatch : OrganizedMatch
    {
        public TimeSpan bestTimeRecord { get; set; }

        public OrganizedSingleMatch()
        {
            Status = 0;
            PlayersWaiting = 0;
        }

        public OrganizedSingleMatch(string OrganizerPlayerId, int ArraySizeToSort)
        {
            Status = 2;
            player1 = OrganizerPlayerId;
            PlayersWaiting = 1;
            ArraySize = ArraySizeToSort;
        }
        
        public void joinMatch(string PlayerId)
        {
            if (PlayersWaiting == 0)
            {
                player1 = PlayerId;
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
