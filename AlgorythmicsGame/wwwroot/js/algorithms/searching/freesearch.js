'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.initLimits();
    AlgoRythmics.startAlgorithm = async function (array) {        
        var n = array.length;
        var key = $('#value').val();
        var keyFounded = false;
        var position = -1;
        var i = -1;
        var oneSelected = false;


        
        $('#swapButton,#compareButton,#insertButton').on('click', function (event) {
            if (i == -1) {
                $('#choiceContainer').removeClass('wellDone');
                $('#choiceContainer').addClass('wrongAnswer');
                $('#progressMessage').text('Ooops... First select an element!');
                return;
            }

            AlgoRythmics.searchAlgorithmCompare(array, i);
            i = -1;
        });
                

        $(document).on('click', '#ItemContainer div', function (event) {
            var element = $(event.target);
            i = element.index();
            AlgoRythmics.searchAlgorithmSelect(array, i);
        });

        $('#submitButton').on('click', function (event) {
            if (array[i] == key) {
                AlgoRythmics.cleanUp();
                AlgoRythmics.finishAlgorithm();
                AlgoRythmics.searchIsTerminated(keyFounded, position);
                //$('#congratulations').modal('show');
            } else {
                $('#choiceContainer').removeClass('wellDone');
                $('#choiceContainer').addClass('wrongAnswer');
                $('#progressMessage').text('Ooops... The result is wrong!');
            }
        });

        /*await AlgoRythmics.showLimits("i", 0, array.length - 1);
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
           }*/

        

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