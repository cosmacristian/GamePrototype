'use strict';
(function ($, AlgoRythmics) {

    AlgoRythmics.startAlgorithm = async function (array) {
        $('.Tray').empty();
        await quickSort(array, $('.Tray'), 0, array.length - 1, 0, 'right');/*.then(sortedArray => async function (){
            console.log(sortedArray);
            await AlgoRythmics.cleanUp();
            AlgoRythmics.finishAlgorithm();
            await AlgoRythmics.addCorrectPosition(sortedArray, 0, sortedArray.length);
            await AlgoRythmics.arrayIsSorted();
            $('#congratulations').modal('show');
        });*/
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            $('.Tray').empty();
        } else {
            await AlgoRythmics.cleanUp();
            AlgoRythmics.finishAlgorithm();
            await AlgoRythmics.arrayIsSorted();
            //$('#congratulations').modal('show');
        }
    };
    var swapped = false;

    async function showPivot(elm) {
        $(".item").removeClass("min_idx");
        elm.addClass("min_idx");
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
    }
    
    async function partition(items, left, right, container) {
        await AlgoRythmics.highlightCodeBlock('.functionPreSortCode');
        var pivot = items[left],
            i = left,
            j = right;
        var itemsContainer = container.children('.ItemContainer');
        var iPointers = container.children('.iPointerContainer');
        var jPointers = container.children('.jPointerContainer');
        var pivotElm = itemsContainer.children().eq(0);
        showPivot(pivotElm);
        await AlgoRythmics.highlightCodeBlock('.pivotCode');
        await AlgoRythmics.markWithPointer(iPointers, (i - left), 'i', false, 'i', false);
        await AlgoRythmics.markWithPointer(jPointers, (j - left), 'j', false, 'j', true);
        //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        await AlgoRythmics.highlightCodeBlock('.whileCycle');
        while (i < j) {
            if (AlgoRythmics.stopSignal) {
                await AlgoRythmics.cleanUp();
                break;
            }
            if (items[i] <= items[j]) {
                if (!swapped) {
                    var rightElm = itemsContainer.children()[(j - left)];
                    var leftElm = itemsContainer.children()[(i - left)];
                    await AlgoRythmics.treeSelect(leftElm, rightElm,i,j);
                    //await sleep(1000);
                    //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                    await AlgoRythmics.treeCompare(leftElm, rightElm, i, j);

                }
                swapped = false;
                if (pivot == items[j]) { await AlgoRythmics.highlightCodeBlock('.isPivot'); }
                else { await AlgoRythmics.highlightCodeBlock('.notPivot');}
                if (pivot == items[j]) {
                    await AlgoRythmics.highlightCodeBlock('.iPointerIterate');
                    await AlgoRythmics.clearPointers(iPointers,true);
                    //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                    i++;
                    await AlgoRythmics.markWithPointer(iPointers, (i - left), 'i', false, 'i',true);
                    //await AlgoRythmics.delay(AlgoRythmics.delayInMs);

                } else {
                    await AlgoRythmics.highlightCodeBlock('.jPointerIterate');
                    await AlgoRythmics.clearPointers(jPointers,true);
                   // await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                    j--;
                    await AlgoRythmics.markWithPointer(jPointers, (j - left), 'j', false, 'j',true);
                    //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                }
            } else {
                var rightElm = itemsContainer.children()[(j - left)];
                var leftElm = itemsContainer.children()[(i - left)];
                await AlgoRythmics.treeSelect(leftElm, rightElm, j, i);
                //await sleep(1000);
                //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                await AlgoRythmics.treeCompare(rightElm, leftElm, j, i);

                //await AlgoRythmics.treeSelect(leftElm, rightElm, j, i);
                //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
                swapped = true;
                await AlgoRythmics.treeSwap(items, i, j, itemsContainer, left);
                //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            }

        }
        $('.min_idx').addClass("sortedElement");
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        await AlgoRythmics.clearPointers(iPointers,false);
        await AlgoRythmics.clearPointers(jPointers,true);
        await AlgoRythmics.highlightCodeBlock('.returnPivot');
        return i;
    }

    async function quickSort(array, parent, left, right, level, side, lowerContainer) {
        await AlgoRythmics.highlightCodeBlock('.functionQuickCode');
        var index;
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        if (lowerContainer === undefined)
            lowerContainer = AlgoRythmics.displayArray(array, parent, left, right + 1, level, side);

        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        var container = $(lowerContainer).siblings(".Workspace");
        if (left < right) {
            await AlgoRythmics.highlightCodeBlock('.firstCompare');
            await AlgoRythmics.highlightCodeBlock('.preSortCode');
            index = await partition(array, left, right, container);
            if (AlgoRythmics.stopSignal) {
                await AlgoRythmics.cleanUp();
                return;
            }
            if (left <= index - 1)
                var leftLowerContainer = AlgoRythmics.displayArray(array, lowerContainer, left, index, level + 1, 'left');
            if (index + 1 <= right)
                var rightLowerContainer = AlgoRythmics.displayArray(array, lowerContainer, index + 1, right + 1, level + 1, 'right');
            await AlgoRythmics.fadeAway(container);
            if (left <= index - 1) {
                AlgoRythmics.RecursiveCall('QuickSort', left, index - 1);
                await AlgoRythmics.highlightCodeBlock('.firstHalfRecursiveCallCode');
                array = await quickSort(array, lowerContainer, left, index - 1, level + 1, 'left', leftLowerContainer);
                AlgoRythmics.RecursiveReturn();
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    return;
                }
            }
            if (index + 1 <= right) {
                AlgoRythmics.RecursiveCall('QuickSort', index + 1, right);
                await AlgoRythmics.highlightCodeBlock('.secondHalfRecursiveCallCode');
                array = await quickSort(array, lowerContainer, index + 1, right, level + 1, 'right', rightLowerContainer);
                AlgoRythmics.RecursiveReturn();
                if (AlgoRythmics.stopSignal) {
                    await AlgoRythmics.cleanUp();
                    return;
                }
            }
            await AlgoRythmics.fadeIn(container);
            AlgoRythmics.updateArray(array, container.children(".ItemContainer"), left, right + 1);
            await await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            lowerContainer.hide();
            return array;
        }
        container.children('.ItemContainer').children().addClass("sortedElement");
        return array;
    }

    
    AlgoRythmics.initLimits = function (length) {

        AlgoRythmics.limits.firstHalfRecursiveCallFirstParamValue = "i";
        AlgoRythmics.limits.firstHalfRecursiveCallSecondParamValue = "k-1";
        AlgoRythmics.limits.secondHalfRecursiveCallFirstParamValue = "k+1";
        AlgoRythmics.limits.secondHalfRecursiveCallSecondParamValue = "j";

        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

})(jQuery, window.AlgoRythmics);