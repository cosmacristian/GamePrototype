'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.startAlgorithm = async function (array) {

        var i = 0, j = 0;
        await AlgoRythmics.showLimits("gap", 1, array.length / 2);

        for (var gap = Math.floor(array.length / 2); gap >= 1; gap = Math.floor(gap/ 2)) {
            await AlgoRythmics.showLimits("i", gap, array.length - 1);

            for (i = gap; i <= array.length - 1; i++) {
                await AlgoRythmics.startCycle("i", i, i);
                //await AlgoRythmics.showLimits("j", 0, i-gap);
            
                for (j = i - gap; j >= 0; j= j- gap) {
                    await AlgoRythmics.startCycle("j", j, j);
                    await AlgoRythmics.select(array, j, j+gap);

                    await AlgoRythmics.compare(array, array, j, j+gap);

                    if (array[j] > array[j + gap]) {
                        await AlgoRythmics.swap(array, array, j, j + gap);
                    }
                    else {
                        await AlgoRythmics.compareResult(false);
                        break;
                    }

                    if (AlgoRythmics.stopSignal) break;
                    if (j > 0) { await AlgoRythmics.increment("j", j - 1, j); }

                }
                //await AlgoRythmics.addCorrectPosition(array, 0, j + 1);

                if (AlgoRythmics.stopSignal) break;

                if (i <= array.length-2) { await AlgoRythmics.increment("i", i-1, i); }
                await AlgoRythmics.endCycle("j", j + 1, j);
                await AlgoRythmics.increment("j", j, i-gap);
                await AlgoRythmics.newCycle();
            }
            if (AlgoRythmics.stopSignal) break;
          
            await AlgoRythmics.endCycle("i", i + 1, i);

        }

        if (!AlgoRythmics.stopSignal) {
            await AlgoRythmics.finishAlgorithm();
            await AlgoRythmics.addCorrectPosition(array, 0, array.length);
            await AlgoRythmics.arrayIsSorted();
        }
     

    };

    AlgoRythmics.algorithmSound = async function (n) {

        for (var gap = n / 2; gap >= 1; gap /= 2) {
            for (var i = gap; i <= n - 1; i++) {
                await AlgoRythmics.sound("i", 300);
                for (var j = i - gap; j >= 0; j -= gap) {
                    await AlgoRythmics.sound("j", 300);
                    if (AlgoRythmics.stopVolumeSignal) break;
                }
                await AlgoRythmics.delay(200);
                if (AlgoRythmics.stopVolumeSignal) break;

            }
            await AlgoRythmics.delay(200);
            if (AlgoRythmics.stopVolumeSignal) break;
        }

    };

    AlgoRythmics.initLimits = function (length) {

        AlgoRythmics.limits.lowerLimitI = "gap";
        AlgoRythmics.limits.upperLimitI = "n-1";
        AlgoRythmics.limits.lowerLimitJ = "0";
        AlgoRythmics.limits.upperLimitJ = "i-gap";

        AlgoRythmics.limits.possibleLowerILimit = null;
        AlgoRythmics.limits.possibleUpperILimit = length - 1;
        AlgoRythmics.limits.possibleLowerJLimit = null;
        AlgoRythmics.limits.possibleUpperJLimit = null;

        AlgoRythmics.limits.compareFirstParam = "j";
        AlgoRythmics.limits.compareSecondParam = "j+gap";
        AlgoRythmics.limits.swapFirstParam = "j";
        AlgoRythmics.limits.swapSecondParam = "j+gap";

        AlgoRythmics.correctCycleStructure = "twoMixed";

        AlgoRythmics.limits.startIndexI = AlgoRythmics.limits.lowerLimitI;
        AlgoRythmics.limits.endIndexI = AlgoRythmics.limits.upperLimitI;
        AlgoRythmics.limits.startIndexJ = AlgoRythmics.limits.upperLimitJ
        AlgoRythmics.limits.endIndexJ = AlgoRythmics.limits.lowerLimitJ;

        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

    }) (jQuery, window.AlgoRythmics);