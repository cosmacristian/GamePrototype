using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Context
{
    public class OrganizedMultiMatch : OrganizedMatch
    {

        public OrganizedMultiMatch()
        {
            Status = 0;
            PlayersWaiting = 0;
        }

        public OrganizedMultiMatch(string OrganizerPlayerId, int ArraySizeToSort)
        {
            Status = 1;
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
                Status = 1;
            }
            else
            {
                if (PlayersWaiting == 1)
                {
                    player2 = PlayerId;
                    PlayersWaiting += 1;
                    Status = 2;
                }
                else
                {
                    throw new OperationCanceledException("Player limit reached!");
                }
            }
        }

        public void finishMatch()
        {
            Status = 3;
        }
    }
}
