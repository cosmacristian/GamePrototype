using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models
{
    public class MatchStatus
    {
        public int statusCode { get; private set; }

        public void setToReady()
        {
            statusCode = 1;
        }

        public void setToStarted()
        {
            statusCode = 2;
        }

        public void setToFinished()
        {
            statusCode = 3;
        }
    }
}
