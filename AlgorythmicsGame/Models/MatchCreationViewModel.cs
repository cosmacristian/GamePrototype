using AlgorythmicsGame.Models.CustomValidation;
using AlgorythmicsGame.Models.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlgorythmicsGame.Models
{
    public class MatchCreationViewModel
    {
        public List<Algorithm> AvailableAlgorithms;
        [Required]
        public int? SelectedAlgorithmId { get; set; }
        public AlgorithmType SelectedAlgorithmType { get; set; }
        //public string LearningStepScriptName { get; set; }
        //public string AlgorithmScriptName { get; set; }
        // public string PartialViewName { get; set; }
        //public string AlgorithmPartialView { get; set; }
        public int ArraySize { get; set; }
        public DisplayMode? Animation { get; set; }
        public InputType? InputType { get; set; }
        [RequiredIfPropEqualsValue(nameof(InputType), AlgorythmicsGame.Models.Enums.InputType.TeacherInput, ErrorMessage = "For Teacher Input please provide an array!")]
        public string TeacherInput { get; set; }
        public bool IsSinglePlayer { get; set; }

        public string[] a
        {
            get { return new string[]{ nameof(InputType), nameof(SelectedAlgorithmType) }; }
        }
         
        public object[] b
        {
            get { return new object[] { AlgorythmicsGame.Models.Enums.InputType.TeacherInput, AlgorythmicsGame.Models.Enums.AlgorithmType.Searching }; }
        } 
        [RequiredIfPropsEqualValues( ErrorMessage = "For Teacher Input please provide an element!")]
        public string SearchTarget { get; set; }
    }
}
