'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.startAlgorithm = async function (array) {
        $('.Tray').empty();
        var key = $('#value').val();
        $('#value').prop('readonly','true');
        var position = await binarySearch(array.sort(cmp), key, 0, array.length, $('.Tray'), 0, 'right');
        if (AlgoRythmics.stopSignal) {
            $('#value').prop('readonly', 'false');
            await AlgoRythmics.cleanUp();
            $('.Tray').empty();
        } else {
            $('#value').prop('readonly', 'false');
            await AlgoRythmics.cleanUp();
            AlgoRythmics.finishAlgorithm();
            if (position != -1) {
                await AlgoRythmics.searchIsTerminated(true, position);
            } else {
                await AlgoRythmics.searchIsTerminated(false, position);
            }
            //$('#congratulations').modal('show');
        }
    };
    
    async function binarySearch(array, key, begin, end, parent, level, side) {
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        await AlgoRythmics.highlightCodeBlock('.functionQuickCode');
        //Check if array can be split
        var selected;
        var ret;
        for (let tmp = 0; tmp < begin; tmp++) { //temporary fix
            array.unshift("0");
        }
        var lowerContainer = AlgoRythmics.displayArray(array, parent, begin, end, level, side);
        for (let tmp = 0; tmp < begin; tmp++) { //temporary fix
            array.shift();
        }
        var workspace = $(lowerContainer).siblings('.Workspace');
        //window.scrollTo(0, document.body.scrollHeight);
        await AlgoRythmics.highlightCodeBlock('.firstCompare');
        if (array.length < 2) {
            if (array[0] != key) {
                await AlgoRythmics.highlightCodeBlock('.returnNotFound');
                await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                //window.alert("There is no value equal to " + key + " in the array!")
                return -1;
            } else {
                var arrayMidElem = workspace.children('.ItemContainer').children()[0]
                await AlgoRythmics.searchTreeSelect(arrayMidElem, begin);
                await AlgoRythmics.searchTreeCompare(arrayMidElem, begin, 'found');
                await AlgoRythmics.highlightCodeBlock('.targetFound');
                selected = $(".item:contains('a[" + begin + "]')");
                $(selected).addClass('compareCorrect');
                await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                if (!$(parent).hasClass('Tray'))
                    $(lowerContainer).parent().hide();
                await AlgoRythmics.highlightCodeBlock('.returnFound');
                return begin;
            }
        }
        var jPointers = workspace.children('.jPointerContainer');
        var iPointers = workspace.children('.iPointerContainer');
        await AlgoRythmics.markWithPointer(iPointers, 0, 'i', false, 'i', false);
        await AlgoRythmics.markWithPointer(jPointers, (array.length - 1), 'j', false, 'j', true);
        //Get Middle index
        const middle = Math.floor(array.length / 2);
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        await AlgoRythmics.markWithPointer(jPointers, middle, 'mid', true, '(i+j)/2',true);
        await AlgoRythmics.highlightCodeBlock('.middleIndex');
        //Split Array In Two Sides
        const leftSide = array.slice(0, middle);
        const rightSide = array.slice(middle+1, array.length);
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        //await AlgoRythmics.clearPointers(jPointers,false);
        //await AlgoRythmics.clearPointers(iPointers,true);
        await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
        //Use recusion to continue splitting
        var arrayMidElem = workspace.children('.ItemContainer').children()[middle];
        if (array[middle] > key) {
            await AlgoRythmics.highlightCodeBlock('.targetFound');
            await AlgoRythmics.searchTreeSelect(arrayMidElem, middle+begin);
            await AlgoRythmics.searchTreeCompare(arrayMidElem, middle+begin, 'greater');
            
            await AlgoRythmics.highlightCodeBlock('.greaterThan');
            //await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
            animatedDivide(workspace.children('.ItemContainer'), middle, 600)
            //await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
            await AlgoRythmics.fadeAway(workspace);
            AlgoRythmics.RecursiveCall('BinarySearch', begin, middle + begin-1);
            await AlgoRythmics.highlightCodeBlock('.firstHalfRecursiveCallCode');
            ret = await binarySearch(leftSide, key, begin, middle + begin, lowerContainer, level + 1, 'left');
            AlgoRythmics.RecursiveReturn();
            if (AlgoRythmics.stopSignal) {
                await AlgoRythmics.cleanUp();
                return;
            }
            await AlgoRythmics.fadeIn(workspace);
            await AlgoRythmics.highlightCodeBlock('.firstHalfRecursiveCallCode');
            if (ret != -1)
                workspace.children('.ItemContainer').children().eq(ret - begin).addClass("compareCorrect");
            await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            if (!$(parent).hasClass('Tray'))
                $(lowerContainer).parent().hide();
            return ret;
        } else {
            if (array[middle] < key) {
                await AlgoRythmics.highlightCodeBlock('.targetFound');
                await AlgoRythmics.highlightCodeBlock('.greaterThan');
                await AlgoRythmics.searchTreeSelect(arrayMidElem, middle+begin);
                await AlgoRythmics.searchTreeCompare(arrayMidElem, middle+begin, 'less');
                
                await AlgoRythmics.highlightCodeBlock('.lessThan');
                //await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
                animatedDivide(workspace.children('.ItemContainer'), middle+1, 600)
                //await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
                await AlgoRythmics.fadeAway(workspace);
                AlgoRythmics.RecursiveCall('BinarySearch', middle + begin + 1, end-1);
                await AlgoRythmics.highlightCodeBlock('.secondHalfRecursiveCallCode');
                ret = await binarySearch(rightSide, key, middle + begin + 1, end, lowerContainer, level + 1, 'right');
                AlgoRythmics.RecursiveReturn();
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    return;
                }
                await AlgoRythmics.fadeIn(workspace);
                await AlgoRythmics.highlightCodeBlock('.secondHalfRecursiveCallCode');
                if (ret != -1)
                    workspace.children('.ItemContainer').children().eq(ret - begin).addClass("compareCorrect");
                await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                if (!$(parent).hasClass('Tray'))
                    $(lowerContainer).parent().hide();
                return ret;
            } else {
                await AlgoRythmics.searchTreeSelect(arrayMidElem, middle+begin);
                await AlgoRythmics.searchTreeCompare(arrayMidElem, middle+begin, 'found');
                await AlgoRythmics.highlightCodeBlock('.targetFound');
                selected = $(".item:contains('a[" + (middle + begin) + "]')");
                $(selected).addClass('compareCorrect');
                await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                if (!$(parent).hasClass('Tray')) 
                    $(lowerContainer).parent().hide();
                await AlgoRythmics.highlightCodeBlock('.returnFound');
                return middle + begin;
            }

        }
    }

    function cmp(a, b) {
        if (parseInt(a) < parseInt(b)) {
            return -1;
        }
        if (parseInt(a) > parseInt(b)) {
            return 1;
        }
        return 0;
    }
    

    function animatedDivide(containter, index, duration) {
        var left = {
            marginLeft: "-=25",
            marginRight: "+=25"
        };

        var right = {
            marginLeft: "+=25",
            marginRight: "-=25"
        };

        let items = containter.children();
        for (let i = 0; i < index; i++) {
            items.eq(i).animate(left, duration, 'linear', function () {
                items.eq(i).animate(right, duration, 'linear');
            });
        }
        for (let i = index; i < items.length; i++) {
            items.eq(i).animate(right, duration, 'linear', function () {
                items.eq(i).animate(left, duration, 'linear');
            });
        }

    }
    

    AlgoRythmics.initLimits = function (length) {

        AlgoRythmics.limits.firstHalfRecursiveCallFirstParamValue = "i";
        AlgoRythmics.limits.firstHalfRecursiveCallSecondParamValue = "k-1";
        AlgoRythmics.limits.secondHalfRecursiveCallFirstParamValue = "k+1";
        AlgoRythmics.limits.secondHalfRecursiveCallSecondParamValue = "j";
        AlgoRythmics.limits.indexParamValue = "(i+j)/2";
        AlgoRythmics.limits.middlePointerParamValue = "k";
        AlgoRythmics.limits.correctIndexParamValue = "k";
        AlgoRythmics.limits.middleCompareParamValue = "k";
        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

})(jQuery, window.AlgoRythmics);