'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.startAlgorithm = async function (array) {

        AlgoRythmics.initLimits();
        var n = array.length;    
        var sorted = 0;

        await AlgoRythmics.showLimits("i", 1, array.length - 1);
        await AlgoRythmics.startCycle("i", 1);
        await AlgoRythmics.showLimits("i", 1, array.length - 1);
        for (var i = 1; i <= n - 1; ++i) {
            await AlgoRythmics.showLimits("j", 0, i - 1);
            await AlgoRythmics.startCycle("j", i - 1);
            for (var j = i - 1; j >= 0; --j) {

                await AlgoRythmics.showLimits("j", 0, 0);
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    break;
                }
                await AlgoRythmics.select(array, j, j + 1);
                await AlgoRythmics.compare(array, array, j, j+1);
                if (array[j] > array[j + 1]) {
                    await AlgoRythmics.compareResult(j, j + 1);
                    await AlgoRythmics.swap(array, array, j, j + 1);
                }
                else {
                    //AlgoRythmics.addCorrectPosition(array, 0, j);
                    AlgoRythmics.increment("j", j, i);
                    break;
                }
                if (j >= 1) {
                    await AlgoRythmics.increment("j", j, j - 1); 
                }
                await AlgoRythmics.delay(this.delayInMs);
            }
            
            if (AlgoRythmics.stopSignal) {
                break;
            }
          
            await AlgoRythmics.delay(this.delayInMs);

            if (i < n - 1) {
                await AlgoRythmics.increment("i", i, i + 1);
               
                //await AlgoRythmics.increment("j", j, 0);
                //await AlgoRythmics.showLimits("j", 0, 0);
                //await AlgoRythmics.showLimits("j", 0, i - 1);
                
            }
            await AlgoRythmics.newCycle();
           
        }

        await AlgoRythmics.cleanUp();
        if (i > n - 1) {
            AlgoRythmics.finishAlgorithm();
            await AlgoRythmics.arrayIsSorted();
        }
     
    };


    AlgoRythmics.algorithmSound = async function (n) {
        for (var i = 1; i <= n - 1; ++i) {
            await AlgoRythmics.sound("i", 300);
            await AlgoRythmics.delay(300);
            for (var j = i - 1; j >= 0; --j) {
                await AlgoRythmics.sound("j", 300);
                if (AlgoRythmics.stopVolumeSignal) {
                    break;
                }
                await AlgoRythmics.delay(600);

            }
            if (AlgoRythmics.stopVolumeSignal) {
                break;
            }
            await AlgoRythmics.delay(700);

        }
    };

    AlgoRythmics.initLimits = function (length) {

        AlgoRythmics.limits.lowerLimitI = "1";
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

        AlgoRythmics.correctCycleStructure = "twoMixed";

        AlgoRythmics.limits.startIndexI = AlgoRythmics.limits.lowerLimitI;
        AlgoRythmics.limits.endIndexI = AlgoRythmics.limits.upperLimitI;
        AlgoRythmics.limits.startIndexJ = AlgoRythmics.limits.upperLimitJ;
        AlgoRythmics.limits.endIndexJ = AlgoRythmics.limits.lowerLimitJ;

        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

})(jQuery, window.AlgoRythmics);