'use strict';
(function (AlgoRythmics) {

    AlgoRythmics.Enums = {};

    AlgoRythmics.Enums.StatisticsType = {
        "VideoPageOpened": 100,
        "VideoStarted": 101,
        "VideoFinished": 102,
        "AnimationPageOpened": 200,
        "AnimationStarted": 201,
        "AnimationFinished": 202
    };

    AlgoRythmics.Enums.InputType = {
        "BestCaseScenario": 0,
        "RandomInput": 1,
        "WorstCaseScenario": 2,
        "TeacherInput": 3
    };

    AlgoRythmics.Enums.PlaybackType = {
        "Interactive": 0,
        "Automatic": 1
    };

    AlgoRythmics.Enums.DisplayMode = {
        "Whitebox": 0,
        "Blackbox": 1
    };

    AlgoRythmics.Enums.AnswerType = {
        "SingleValue": 0,
        "Select" : 1
    };

})(window.AlgoRythmics);