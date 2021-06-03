using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models
{
    public class AlgorithmViewModel
    {

        public Algorithm Algorithm { get; set; }
        public AnimationViewModel AnimationModel { get; set; }
        public string AlgorithmScriptName;
        public string LearningStepScriptName;
        public string PartialViewName;
    }
}
