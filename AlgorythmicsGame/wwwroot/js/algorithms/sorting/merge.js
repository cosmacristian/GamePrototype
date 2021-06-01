(function ($) {
    /*
    function displayLimits(array, arrayName, pointer, pointerName, pointerValue, limitType) {
        console.log( "LIMIT: The pointer of " + arrayName + ": " + pointerName + " has " + limitType+ "limit: " + pointerValue);
    }

    function iterate(array, arrayName, pointer, pointerName, value) {
        var newValue = pointer + value;
        console.log("ITERATE: Iterate pointer: " + name + "of array: " + arrayName +" with: " + value + "-> " + newValue);
    }

    function compare(array1, array1Name, array2, array2Name, pointer1, pointer1Name, pointer2, pointer2Name) {
        console.log("COMPARE: Comparison of elements: " + array1Name + "[" + pointer1Name + "]= ", array1[pointer1] +", " + array2Name + "[" + pointer2Name + "]= " + array2[pointer2]);
    }

    function choose(array1, array1Name, pointer1, pointer1Name, array2, array2Name, pointer2, pointer2Name) {
        console.log("CHOOSE: Choosing the smaller element from previous comparison, which is: " + arrayName + "[" + pointerName + "]=" + array[pointer] + ". New position: " + array2Name + "[" + pointer2Name+"]");
    }
    function merge(array, left, center, right) {

        var i = 0, j = 0, t, k = 0, n = center - left - 1, m = r - center;  
      
        var leftArray = new Array();
        var rightArray = new Array();
        var mergedArray = new Array();

        displayLimits(leftArray, "leftArray", i, "i", 0, "START");
        displayLimits(leftArray, "leftArray", i, "i", n, "END");

        displayLimits(rightArray, "rightArray", j, "j", 0, "START");
        displayLimits(rightArray, "rightArray", j, "j", M, "END");

        displayLimits(mergedArray, "mergedArray", k, "k", 0, "START");
        displayLimits(mergedArray, "mergedArray", k, "k", n-i+m-j , "END");

        for (t = left; t < center; ++t) {
            leftAray.push(array[t]);
        }
        for (t = center; t < m; ++t) {
            rightArray.push(array[t]);
        }

        iterate(leftArray, "leftArray", i, "i", 0, 0);
        iterate(rightArray, "rightArray", j, "j", 0, 0);
        iterate(mergedArray, "mergedArray", k, "k", 0, 0);

        while (i < n && j < m) {
            if (array[i] < array[j]) {
                compare(leftArray, "leftArray", rightArray, "rightArray", i, "i", j, "j");
                choose(leftArray, "leftArray", i, "i", mergedArray, "mergedArray", k, "k");
                mergedArr.push(array[i]);
                iterate(leftArray, "leftArray", i, "i", 1);
                iterate(mergedArray, "mergedArray", k, "k", 1);
                k++;
                i++;
            }
            else {
                choose(rightArray, "rightArray", j, "j", mergedArray, "mergedArray", k, "k");
                mergedArr.push(array[j]);
                iterate(rightArray, "rightArray", j, "j", 1);
                iterate(mergedArray, "mergedArray", k, "k", 1);
                k++;
                j++;
            }
        }

        if (i < n) {
            for (t = i; t < n; ++t) {
                iterate(leftArray, "leftArray", i, "i", 1);
                iterate(mergedArray, "mergedArray", t, "k", 1);
                k++;
                mergedArr.push(array[t]);
            }
        }
        if (j < m) {
            for (t = j; t < m; ++t) {
                iterate(rightArray, "rightArray", j, "j", 1);
                iterate(mergedArray, "mergedArray", t, "k", 1);
                k++;
                mergedArr.push(array[t]);
            }
        }

    }

    function mergeSort(array, left, right) {

        if (left < right) {
            var center = l + (right-left) / 2;
            mergeSort(array, left, center);
            mergeSort(array, center + 1, right);
            merge(array, left, center, right);
        }
    }*/
    AlgoRythmics.startAlgorithm = async function (array) {
        $('.Tray').empty();
        await mergeSort(array, $('.Tray'), 0, 'right');
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
    

    async function mergeSort(array, parent, level, side, lowerContainer) {
        await AlgoRythmics.highlightCodeBlock('.functionMergeSortCode');
        //Check if array can be split
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        if (lowerContainer === undefined)
            var lowerContainer = AlgoRythmics.displayArray(array, parent, 0, array.length, level, side);
        
        var iPointers = $(lowerContainer).siblings('.Workspace').children('.iPointerContainer');
        var jPointers = $(lowerContainer).siblings('.Workspace').children('.jPointerContainer');
        /*await AlgoRythmics.markWithPointer(iPointers, 0, 'i', true, 'i');
        await AlgoRythmics.markWithPointer(jPointers, (array.length - 1), 'j', true, 'i');
        await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
        await AlgoRythmics.clearPointers(iPointers);
        await AlgoRythmics.clearPointers(jPointers);*/
        await AlgoRythmics.highlightCodeBlock('.firstCompare');
        if (array.length < 2) {
            $(lowerContainer).siblings('.Workspace').children('.ItemContainer').children().addClass("sortedElement");
            return array;
        }
        await AlgoRythmics.markWithPointer(iPointers, 0, 'i', false, 'i',false);
        await AlgoRythmics.markWithPointer(jPointers, (array.length - 1), 'j', false, 'j',true);
        //Get Middle index
        const middle = Math.floor(array.length / 2);
        await AlgoRythmics.highlightCodeBlock('.middleIndex');
        await AlgoRythmics.markWithPointer(jPointers, middle-1, 'mid', true, '(i+j)/2',true);
        //Split Array In Two Sides
        const leftSide = array.slice(0, middle);
        const rightSide = array.slice(middle, array.length);
        //Use recusion to continue splitting
        var items = (jPointers.siblings('.ItemContainer'));
        animatedDivide(items, middle, AlgoRythmics.delayInMs);
        await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
        //await AlgoRythmics.clearPointers(iPointers);
        //await AlgoRythmics.clearPointers(jPointers);
        console.log('split:', leftSide, rightSide);
        var leftLowerContainer = await AlgoRythmics.displayArray(leftSide, lowerContainer, 0, leftSide.length, level + 1, 'left');
        var rightLowerContainer = await AlgoRythmics.displayArray(rightSide, lowerContainer, 0, rightSide.length, level + 1, 'right');
        //fade away
        await AlgoRythmics.fadeAway($(lowerContainer).siblings('.Workspace'));
        await AlgoRythmics.delay(AlgoRythmics.delayInMs / 2);
        await AlgoRythmics.highlightCodeBlock('.firstHalfRecursiveCallCode');
        AlgoRythmics.RecursiveCall('MergeSort', 0, middle-1);
        var sortedleft = await mergeSort(leftSide, lowerContainer, level + 1, 'left', leftLowerContainer);
        AlgoRythmics.RecursiveReturn();
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        await AlgoRythmics.delay(AlgoRythmics.delayInMs / 2);
        await AlgoRythmics.highlightCodeBlock('.secondHalfRecursiveCallCode');
        AlgoRythmics.RecursiveCall('MergeSort', middle, array.length-1);
        var sortedright = await mergeSort(rightSide, lowerContainer, level + 1, 'right', rightLowerContainer);
        AlgoRythmics.RecursiveReturn();
        if (AlgoRythmics.stopSignal) {
            await AlgoRythmics.cleanUp();
            return;
        }
        await AlgoRythmics.delay(AlgoRythmics.delayInMs/2);
        //fade back
        await AlgoRythmics.highlightCodeBlock('.mergeCall');
        await AlgoRythmics.fadeIn($(lowerContainer).siblings('.Workspace'));
        return await merge(sortedleft, sortedright, lowerContainer);
    }

    async function merge(left, right, lowerContainer) {
        //Create New Array
        const result = [];
        var tempVal;
        var selected;
        var container = $(lowerContainer).siblings('.Workspace').children('.ItemContainer');
        $(container).parent().css('background-color', 'rgba(0, 128, 0, 0.4)');
        var children = $(lowerContainer).children('.Array').children('.Workspace').children('.ItemContainer');
        $(children).parent().css('background-color', 'rgba(255, 165, 0, 0.4)');
        container.empty();
        var newLength = (right.length + left.length);
        //Check if left array and right array is empty
        while (left.length && right.length) {
            //Find lower value
            var rightElm = $(lowerContainer).children('.Array').eq(1).children('.Workspace').children('.ItemContainer').children("div:contains('" + right[0] + "')")[0];
            var leftElm = $(lowerContainer).children('.Array').eq(0).children('.Workspace').children('.ItemContainer').children("div:contains('" + left[0] + "')")[0];
            var rightInd = $(lowerContainer).children('.Array').eq(1).children('.Workspace').children('.ItemContainer').children().index(rightElm);
            var leftInd = $(lowerContainer).children('.Array').eq(0).children('.Workspace').children('.ItemContainer').children().index(leftElm);
            
            await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            await AlgoRythmics.highlightCodeBlock('.functionMergeCode');
            if (left[0] <= right[0]) {
                await AlgoRythmics.treeSelect(leftElm, rightElm, leftInd, rightInd);
                await AlgoRythmics.treeCompare(leftElm, rightElm, leftInd, rightInd);
                //Add left value
                tempVal = left.shift();
                selected = children.children("div:contains('" + tempVal + "')");
                //$(selected).addClass('selected');
                result.push(tempVal);
                await AlgoRythmics.treeSelect(leftElm, null, leftInd, null);
                await AlgoRythmics.treeInsert(result, tempVal, container, newLength, leftInd);
            } else {
                await AlgoRythmics.treeSelect(rightElm, leftElm, rightInd, leftInd);
                await AlgoRythmics.treeCompare(rightElm, leftElm, rightInd, leftInd);
                //Add right value
                tempVal = right.shift();
                selected = children.children("div:contains('" + tempVal + "')");
                //$(selected).addClass('selected');
                result.push(tempVal);
                await AlgoRythmics.treeSelect(null, rightElm, null, rightInd);
                await AlgoRythmics.treeInsert(result, tempVal, container, newLength, rightInd);
            }
            //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            
            //AlgoRythmics.treeInsert(result, tempVal, container, (right.length + left.length));
            //var selected2 = /*AlgoRythmics.*/updateArray(result, container, tempVal, (right.length + left.length));
            //await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        }
        //Merge left array
        while (left.length) {
            await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            await AlgoRythmics.highlightCodeBlock('.functionMergeCode');
            tempVal = left.shift();
            selected = children.children("div:contains('" + tempVal + "')")[0];
            var ind = children.children().index(selected);
            await AlgoRythmics.treeSelect(selected, null, ind, null);
            //$(selected).addClass('selected');
            result.push(tempVal);
            await AlgoRythmics.treeInsert(result, tempVal, container, newLength,ind);
        }
        //Merge right array
        while (right.length) {
            await AlgoRythmics.delay(AlgoRythmics.delayInMs);
            await AlgoRythmics.highlightCodeBlock('.functionMergeCode');
            tempVal = right.shift();
            selected = children.children("div:contains('" + tempVal + "')")[0];
            var ind = children.children().index(selected);
            await AlgoRythmics.treeSelect(null, selected, null, ind);
            //$(selected).addClass('selected');
            result.push(tempVal);
            await AlgoRythmics.treeInsert(result, tempVal, container, newLength,ind);
        }
        //return result array
        await AlgoRythmics.delay(AlgoRythmics.delayInMs);
        $(container).parent().css('background-color', '#ffffff00');
        $(children).parent().css('background-color', '#ffffff00');
        $(children).parent().parent().hide();
        console.log('result:', result);
        return result;
    }
    /*
    function updateArray(array, container, value, initLength) {
        console.log(array);
        console.log(value);
        console.log(initLength);
        container.empty();
        var itemWidth = Math.min(Math.floor(container.innerWidth() / array.length) - 10, 30);

        for (var i = 0; i < array.length; i++) {
            var itemHeight = itemHeight = 50 + array[i] * 5;
            var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).css("flex-basis", itemWidth).height(itemHeight).text(array[i]);
            if (i == array.length - 1) newItem.addClass('selected');
            container.append(newItem);
        }
        for (var i = 0; i < initLength; i++) {
            console.log(" * " + i);
            var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).css("flex-basis", itemWidth).height(0).text(' ');
            container.append(newItem);
        }

        selected = $(container).children("div:contains('" + value + "')");
        return $(selected);
    }
    */

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
        AlgoRythmics.limits.firstHalfRecursiveCallSecondParamValue = "k";
        AlgoRythmics.limits.secondHalfRecursiveCallFirstParamValue = "k+1";
        AlgoRythmics.limits.secondHalfRecursiveCallSecondParamValue = "j";
        AlgoRythmics.limits.indexParamValue = "(i+j)/2";
        AlgoRythmics.setLimits();
    };

    $(document).ready(function () {
        AlgoRythmics.initLimits($("#ItemCount").val());

    });

})(jQuery);