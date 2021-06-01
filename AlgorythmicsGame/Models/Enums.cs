using System.ComponentModel.DataAnnotations;

namespace AlgorythmicsGame.Models.Enums
{
    public enum LearningStepType : byte
    {
        Video,

        Animation,

        //[Display(Name = "You are in control")]
        InControl,

        //[Display(Name = "Create code")]
        CreateCode,

        //[Display(Name = "The code comes alive")]
        CodeComesAlive,

        //[Display(Name = "Test")]
        Test
    }

    public enum PlaybackType : byte
    {
        Interactive,
        Automatic
    }

    public enum InputType : byte
    {
        //[Display(Name = "Best case scenario")]
        BestCaseScenario,

        //[Display(Name = "Random input")]
        RandomInput,

        //[Display(Name = "Worst case scenario")]
        WorstCaseScenario,

        //[Display(Name = "Teacher input")]
        TeacherInput
    }

    public enum DisplayMode : byte
    {
        Whitebox,
        Blackbox
    }

    public enum VideoQuestionType : byte
    {
        //[Display(Name = "Individual wording")]
        Normal,
        //[Display(Name = "Bound wording")]
        Bound
    }

    public enum QuestionReasoningType : byte
    {
        //[Display(Name = "No Reasoning Required")]
        Normal,
        //[Display(Name = "Reasoning Required")]
        Reasoning
    }

    public enum AlgorithmType : byte
    {
        Sorting, 
        Searching,
        Searching_Backtracking
    }

    public enum StatisticsType : byte
    {
        VideoPageOpened = 100,
        VideoStarted = 101,
        VideoFinished = 102,

        AnimationPageOpened = 200,
        AnimationStarted = 201,
        AnimationFinished = 202
    }

    public enum LogEntryType: byte
    {
        [Display(Name = "Hint")]
        Hint,
        [Display(Name = "Error")]
        Error,
        [Display(Name = "Step")]
        Step,
        [Display(Name = "Reasoning")]
        Reasoning,
        [Display(Name = "Wrong test answer")]
        WrongAnswer,
    }

    public enum Points: int
    {
        Error = -10,
        SmallError = -5,
        Hint = -17,
    }

    public enum PhaseNames : byte
    {
        [Display(Name = "Score")]
        Select,
        [Display(Name = "Compare")]
        Compare,
        [Display(Name = "Swap")]
        Swap,
        [Display(Name = "Cycle structure")]
        Structure,
        [Display(Name = "Cycle limits")]
        Limits,
        [Display(Name = "Compare/Swap parameters")]
        Parameters
    }

    public enum AnswerTypesOfQuestion : byte
    {
        Value,
        RadioBox,
        NeutralValue,
        NeutralRadioBox
    }

    public enum AnswerType : byte
    {
        False,
        Right,
        Neutral
    }
    
}
