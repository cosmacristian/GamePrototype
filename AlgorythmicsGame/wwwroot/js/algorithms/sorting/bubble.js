'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.startAlgorithm = async function (array) {

        await AlgoRythmics.showLimits("i", 0, array.length - 1);
        var i = array.length - 1, previousI = i, j = 0;

        do {
            var last_swap_index = 0; 
            await AlgoRythmics.startCycle("i", i, 0);
            await AlgoRythmics.showLimits("j", 0, i - 1);

            for (j = 0; j <= i - 1; j++) {
                await AlgoRythmics.startCycle("j", j, 0);
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    break;
                }
                await AlgoRythmics.select(array, j, j + 1);
                await AlgoRythmics.compare(array, array, j, j + 1);

                if (array[j] > array[j + 1]) {
                    await AlgoRythmics.compareResult(j, j + 1);
                    await AlgoRythmics.swap(array, array, j, j + 1);
                    last_swap_index = j;
                }
                if(j < i-1)
                await AlgoRythmics.increment("j", j, j + 1);
                await AlgoRythmics.delay(this.delayInMs);
            }
            await AlgoRythmics.increment("j", j-1, 0);

            await AlgoRythmics.addCorrectPosition(array, last_swap_index+1, array.length);
            await AlgoRythmics.endCycle("j", j - 1, j);
            AlgoRythmics.newCycle();
            
            previousI = i;
            i = last_swap_index;
            await AlgoRythmics.delay(this.delayInMs);
            await AlgoRythmics.increment("i", previousI, i);
            await AlgoRythmics.endCycle("i", previousI, i);
            if (AlgoRythmics.stopSignal) {
                break;
            }

            await AlgoRythmics.delay(this.delayInMs);
            await AlgoRythmics.showLimits("i", 0, "LOWER");

        } while (last_swap_index > 0);

        await AlgoRythmics.cleanUp();
        AlgoRythmics.finishAlgorithm();
        if (last_swap_index <= 0) {
            await AlgoRythmics.addCorrectPosition(array, 0, array.length);
            await AlgoRythmics.arrayIsSorted();
            $('#congratulations').modal('show');
        }
     
    };


    AlgoRythmics.algorithmSound = async function (n) {
        for (var i = 0; i < n - 1; ++i) {
            await AlgoRythmics.sound("i", 300);
            for (var j = i + 1; j < n; ++j) {
                await AlgoRythmics.sound("j", 300);
                if (AlgoRythmics.stopVolumeSignal) {
                    break;
                }
                await AlgoRythmics.delay(500);

            }
            if (AlgoRythmics.stopVolumeSignal) {
                break;
            }
            await AlgoRythmics.delay(700);

        }
    };


    AlgoRythmics.initLimits = function (length) {

        AlgoRythmics.limits.lowerLimitI = "0";
        AlgoRythmics.limits.upperLimitI = "n-1";
        AlgoRythmics.limits.lowerLimitJ = "0";
        AlgoRythmics.limits.upperLimitJ = "i-1";

        AlgoRythmics.limits.possibleLowerILimit = null;
        AlgoRythmics.limits.possibleUpperILimit = length - 1;
        AlgoRythmics.limits.possibleLowerJLimit = null;
        AlgoRythmics.limits.possibleUpperJLimit = null;

        AlgoRythmics.limits.compareFirstParam = "j";
        AlgoRythmics.limits.compareSecondParam = "j+1";
        AlgoRythmics.limits.swapFirstParam = "j";
        AlgoRythmics.limits.swapSecondParam = "j+1";
        AlgoRythmics.limits.startIndexI = AlgoRythmics.limits.upperLimitI;
        AlgoRythmics.limits.endIndexI = AlgoRythmics.limits.lowerLimitI;
        AlgoRythmics.limits.startIndexJ = AlgoRythmics.limits.lowerLimitJ;
        AlgoRythmics.limits.endIndexJ = AlgoRythmics.limits.upperLimitJ;

        AlgoRythmics.correctCycleStructure = "twoMixed";

        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

})(jQuery, window.AlgoRythmics);