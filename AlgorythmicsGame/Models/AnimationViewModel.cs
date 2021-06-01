using AlgorythmicsGame.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlgorythmicsGame.Models
{
    public class AnimationViewModel
    {
        //public LocalizedCourse Course;
        public Algorithm Algorithm;
        //public List<BasicStep> BasicSteps { get; set; }
        //public int LastCompletedStepNumber { get; set; }
        //public LocalizedLearningStep CurrentStep { get; set; }
        public string LearningStepScriptName { get; set; }
        public string AlgorithmScriptName { get; set; }
        public string PartialViewName { get; set; }
        public string AlgorithmPartialView { get; set; }
        public PlaybackType? Playback { get; set; }
        public DisplayMode? Animation { get; set; }
        public InputType? InputType { get; set; }
        public string TeacherInput { get; set; }
        public string SearchTarget { get; set; }
        public string AnimationKeyMoments { get; set; }

    }
}
