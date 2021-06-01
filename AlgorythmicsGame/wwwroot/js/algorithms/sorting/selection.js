'use strict';
(function ($, AlgoRythmics) {

    var _super = $.extend({}, AlgoRythmics);

    async function showMinIdx(value) {
        $(".item").removeClass("min_idx");
        $("#a" + value).addClass("min_idx");
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
       
    }
    AlgoRythmics.startAlgorithm = async function (array) {

        var i = 0, j = 0, min_idx;

        await AlgoRythmics.showLimits("i", 0, array.length - 2);

        for (i = 0; i < array.length - 1; i++) {
            await AlgoRythmics.startCycle("i", i, 0);
            min_idx = i;
            showMinIdx(min_idx);

            await AlgoRythmics.showLimits("j", i + 1, array.length - 1);
            for (j = i + 1; j < array.length; j++) {
                await AlgoRythmics.startCycle("j",j,0);
                await AlgoRythmics.select(array, j, min_idx);
                await AlgoRythmics.compare(array, array, j, min_idx);
                if (array[j] < array[min_idx]) {

                    min_idx = j;
                    await AlgoRythmics.compareResult(min_idx);
                }

                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    break;
                }
                if (j <= array.length -2) { await AlgoRythmics.increment("j", j, j + 1); }
                await AlgoRythmics.delay(this.delayInMs);
            }
            if (AlgoRythmics.stopSignal) {
                break;
            }
            await AlgoRythmics.endCycle("j", j - 1, j);
            await AlgoRythmics.swap(array, array, i, min_idx);
            await AlgoRythmics.delay(this.delayInMs);
           
            await AlgoRythmics.increment("i", i, i + 1);
            await AlgoRythmics.delay(this.delayInMs);

            await AlgoRythmics.endCycle("i", i);

        }
        await AlgoRythmics.cleanUp();


        AlgoRythmics.finishAlgorithm();
        await AlgoRythmics.arrayIsSorted();
 

       
    };

 
    AlgoRythmics.startCycle = async function(pointerName, pointerValue, pointerActualValue){
        await _super.startCycle.call(pointerName, pointerValue, pointerActualValue);
        var previousValue = pointerValue - 1;
        if (pointerName == 'i') {
            if (pointerValue > 0) {
                $("#a" + previousValue).addClass("sortedElement");
                await AlgoRythmics.delay(AlgoRythmics.delayInMs);

            }
        }
    };

    AlgoRythmics.compareResult = async function (n) {
        await this.delay(this.delayInMs);
        $(".item").removeClass("min_idx");
        showMinIdx(n);
        $(".trueCompare").addClass("highlightedCode");
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        $(".trueCompare").removeClass("highlightedCode");
    };

    AlgoRythmics.algorithmSound = async function (n) {
        var i = 0, j = 0, min_idx;

        for (i = 0; i < n - 1; i++) {
            await AlgoRythmics.sound("i", 300);
            min_idx = i;
            for (j = i + 1; j < n; j++) {
                await AlgoRythmics.sound("j", 300);
                await AlgoRythmics.delay(200);
                await AlgoRythmics.delay(this.delayInMs);
                if (AlgoRythmics.stopVolumeSignal) {
                    break;
                }
            }
            if (AlgoRythmics.stopVolumeSignal) {
                break;
            }
        }
    };
    /*
    AlgoRythmics.arrayIsSorted = async function () {
        $(".item").removeClass("min_idx");
        $("#ItemContainer .item").addClass("sortedElement");
    };*/

    AlgoRythmics.initLimits = function (length) {

        AlgoRythmics.limits.lowerLimitI = "0";
        AlgoRythmics.limits.upperLimitI = "n-1";
        AlgoRythmics.limits.lowerLimitJ = "i+1";
        AlgoRythmics.limits.upperLimitJ = "n";

        AlgoRythmics.limits.possibleLowerILimit = null;
        AlgoRythmics.limits.possibleUpperILimit = length - 1;
        AlgoRythmics.limits.possibleLowerJLimit = null;
        AlgoRythmics.limits.possibleUpperJLimit = length;


        AlgoRythmics.limits.compareFirstParam = "j";
        AlgoRythmics.limits.compareSecondParam = "min_idx";
        AlgoRythmics.limits.swapFirstParam = "i";
        AlgoRythmics.limits.swapSecondParam = "min_idx";

        AlgoRythmics.correctCycleStructure = "twoMixed";

        AlgoRythmics.limits.startIndexI = AlgoRythmics.limits.lowerLimitI;
        AlgoRythmics.limits.endIndexI = AlgoRythmics.limits.upperLimitI;
        AlgoRythmics.limits.startIndexJ = AlgoRythmics.limits.lowerLimitJ
        AlgoRythmics.limits.endIndexJ = AlgoRythmics.limits.upperLimitJ;

        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });
})(jQuery, window.AlgoRythmics);