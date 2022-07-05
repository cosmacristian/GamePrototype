'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.initLimits();
    AlgoRythmics.startAlgorithm = async function (array) {        
        var n = array.length;
        var key = $('#value').val();
        var keyFounded = false;
        var position = -1;
        var i = 0;

        await AlgoRythmics.showLimits("i", 0, array.length - 1);
        for (var i = 0; i < n; ++i) {
            await AlgoRythmics.startCycle("i", i, 0);
            await AlgoRythmics.showLimits("i", 0, array.length - 1);
            await AlgoRythmics.searchAlgorithmSelect(array, i);
            await AlgoRythmics.endCycle("i", i, 0);
            await AlgoRythmics.searchAlgorithmCompare(array, i);
            if (array[i] == key) {
                keyFounded = true;
                position = i;
                break;
                }
                if (AlgoRythmics.stopSignal) {
                    break;
            }
            await AlgoRythmics.increment("i", i, i + 1);
            await AlgoRythmics.delay(this.delayInMs);
           }

        await AlgoRythmics.cleanUp();
        AlgoRythmics.finishAlgorithm();
        await AlgoRythmics.searchIsTerminated(keyFounded, position);
        $('#congratulations').modal('show');

    };


    AlgoRythmics.algorithmSound = async function (n) {
        for (var i = 0; i < n; ++i) {
            await AlgoRythmics.sound("i", 300);
            if (AlgoRythmics.stopVolumeSignal) {
                break;
            }
        }
    };

    AlgoRythmics.initLimits = function () {

        AlgoRythmics.limits.lowerLimitI = "0";
        AlgoRythmics.limits.upperLimitI = "n";
        AlgoRythmics.limits.lowerLimitJ = "";
        AlgoRythmics.limits.upperLimitJ = "";
        AlgoRythmics.limits.compareFirstParam = "x";
        AlgoRythmics.limits.compareSecondParam = "a[i]";

        AlgoRythmics.limits.startIndexI = AlgoRythmics.limits.lowerLimitI;
        AlgoRythmics.limits.endIndexI = AlgoRythmics.limits.upperLimitI;

        AlgoRythmics.correctCycleStructure = "one";

        AlgoRythmics.setLimits();
 
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits();

    });

})(jQuery, window.AlgoRythmics);