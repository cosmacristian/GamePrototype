'use strict';
var AlgoRythmics = (function ($) {

    var AlgoRythmics = {};
    var currentAction = '';
    var promiseActionResolver;
    var arrayForSearch = [""];

    AlgoRythmics.delayInMs = 600;
    AlgoRythmics.stopSignal = false;
    AlgoRythmics.pauseSignal = false;
    AlgoRythmics.stopVolumeSignal = false;

    AlgoRythmics.inputType = 0;
    AlgoRythmics.playbackType = 0;
    AlgoRythmics.displayType = 0;
    AlgoRythmics.teacherInput = 0;
    AlgoRythmics.searchTarget = 0;
    AlgoRythmics.courseId = 0;
    AlgoRythmics.algorithmId = 0;
    AlgoRythmics.learningStepId = 0;
    AlgoRythmics.learningStepNumber = 0;
    AlgoRythmics.defaultCourse = false;
    AlgoRythmics.algorithmType = 0;
    AlgoRythmics.algorithmIsRecursive = false;

    AlgoRythmics.limits = {};
    AlgoRythmics.limits.lowerLimitI = "";
    AlgoRythmics.limits.upperLimitI = "";
    AlgoRythmics.limits.lowerLimitJ = "";
    AlgoRythmics.limits.upperLimitJ = "";
    AlgoRythmics.limits.compareFirstParam = "";
    AlgoRythmics.limits.compareSecondParam = "";
    AlgoRythmics.limits.swapFirstParam = "";
    AlgoRythmics.limits.swapSecondParam = "";
    AlgoRythmics.limits.firstHalfRecursiveCallFirstParamValue = "";
    AlgoRythmics.limits.firstHalfRecursiveCallSecondParamValue = "";
    AlgoRythmics.limits.secondHalfRecursiveCallFirstParamValue = "";
    AlgoRythmics.limits.secondHalfRecursiveCallSecondParamValue = "";
    AlgoRythmics.limits.indexParamValue = "";
    AlgoRythmics.limits.middlePointerParamValue = "";
    AlgoRythmics.limits.correctIndexParamValue = "";
    AlgoRythmics.limits.middleCompareParamValue = "";
    AlgoRythmics.correctCycleStructure = "";


    AlgoRythmics.startCycle = async function () {};
    AlgoRythmics.endCycle = async function () { };
    AlgoRythmics.showLimits = async function (pointerName, pointerLowerLimit, pointerUpperLimit) { };
    AlgoRythmics.showLimit = async function (pointerName, pointerLowerLimit, pointerUpperLimit) { };

    AlgoRythmics.compareResult = async function (index) {}; // TODO: this has a lot of calls with different params!
    AlgoRythmics.initLimits = async function () { };
    AlgoRythmics.setLimits = async function () { };
    /*
    * Initializing components
    */
    AlgoRythmics.initComponents = function (model) {
        this.inputType = model.inputType;
        this.playbackType = model.playbackType;
        this.displayType = model.displayType;
        this.teacherInput = model.teacherInput;
        this.searchTarget = model.searchTarget;
        this.courseId = model.courseId;
        this.defaultCourse = model.defaultCourse;
        this.learningStepId = model.learningStepId;
        this.learningStepNumber = model.learningStepNumber;
        this.algorithmType = model.algorithmType;
        this.algorithmId = model.algorithmId;
        this.algorithmIsRecursive = model.algorithmIsRecursive;
    };
    /*
     * Init the array
     */
    function cmpAsc(a, b) { //To sort array into Ascending order
        if (parseInt(a) < parseInt(b)) {
            return -1;
        }
        if (parseInt(a) > parseInt(b)) {
            return 1;
        }
        return 0;
    }

    function cmpDesc(a, b) { //To sort array into Descending order
        if (parseInt(a) < parseInt(b)) {
            return 1;
        }
        if (parseInt(a) > parseInt(b)) {
            return -1;
        }
        return 0;
    }

    AlgoRythmics.initArrayExetended = function (arrayLength, inputType, displayType, teacherInput, digits) {
        var arrayToSort = [];
        var mult = Math.pow(10, digits);
        Math.floor(Math.random() * 100);
        if (inputType == this.Enums.InputType.BestCaseScenario) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = Math.floor(Math.random() * mult);
            }
            arrayToSort = arrayToSort.sort(cmpAsc);
        }
        else if (inputType == this.Enums.InputType.WorstCaseScenario) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = Math.floor(Math.random() * mult);
            }
            arrayToSort = arrayToSort.sort(cmpDesc);
        }
        else if (inputType == this.Enums.InputType.RandomInput) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = Math.floor(Math.random() * mult);
            }
        }
        else if (inputType == this.Enums.InputType.TeacherInput) {
            console.log("Teacher input: " + teacherInput);
            if (teacherInput != null) {
                arrayToSort = teacherInput.split(',');
            }
            $('#ItemCount').val(arrayToSort.length);
        }

        var arrayContainer = $('#ArrayItemsContainer');
        arrayContainer.empty();
        var container = $('#ItemContainer');
        container.empty();
        var iPointerContainer = $('#iPointerContainer');
        iPointerContainer.empty();
        var jPointerContainer = $('#jPointerContainer');
        jPointerContainer.empty();

        var itemWidth = Math.min(Math.floor(container.innerWidth() / arrayToSort.length) - 10, 30);

        for (var i = 0; i < arrayToSort.length; i++) {
            var itemHeight = 0;
            if (displayType == this.Enums.DisplayMode.Blackbox) {
                itemHeight = 50;
            }
            else {
                var divid = 1;
                if (arrayToSort[i] > 10)
                    divid = 3;
                itemHeight = 50 + arrayToSort[i] * 5/divid;
            }

            var newArrayItem = $('<div>').addClass("item").height(30).width(itemWidth).text("a[" + i + "]");
            arrayContainer.append(newArrayItem);

            var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).height(itemHeight).text(arrayToSort[i]);
            container.append(newItem);

            if (iPointerContainer.length > 0) {
                var pointerI = $('<div>').attr('id', 'iPointer' + i).width(itemWidth);
                iPointerContainer.append(pointerI);
            }

            if (jPointerContainer.length > 0) {
                var pointerJ = $('<div>').attr('id', 'jPointer' + i).width(itemWidth);
                jPointerContainer.append(pointerJ);
            }
        }

        return arrayToSort;
    };


    AlgoRythmics.initArray = function (arrayLength, inputType, displayType, teacherInput,) {
        var arrayToSort = [];

        if (inputType == this.Enums.InputType.BestCaseScenario) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = i;
            }
        }
        else if (inputType == this.Enums.InputType.WorstCaseScenario) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = arrayLength - i;
            }
        }
        else if (inputType == this.Enums.InputType.RandomInput) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = i;
            }
            arrayToSort = shuffle(arrayToSort);
        }
        else if (inputType == this.Enums.InputType.TeacherInput) {
            console.log("Teacher input: " + teacherInput);
            if (teacherInput != null) {
                arrayToSort = teacherInput.split(',');
            }
            $('#ItemCount').val(arrayToSort.length);
        }

        var arrayContainer = $('#ArrayItemsContainer');
        arrayContainer.empty();
        var container = $('#ItemContainer');
        container.empty();
        var iPointerContainer = $('#iPointerContainer');
        iPointerContainer.empty();
        var jPointerContainer = $('#jPointerContainer');
        jPointerContainer.empty();

        var itemWidth = Math.min(Math.floor(container.innerWidth() / arrayToSort.length) - 10, 30);

        for (var i = 0; i < arrayToSort.length; i++) {
            var itemHeight = 0;
            if (displayType == this.Enums.DisplayMode.Blackbox) {
                itemHeight = 50;
            }
            else {
                itemHeight = 50 + arrayToSort[i] * 5;
            }

            var newArrayItem = $('<div>').addClass("item").height(30).width(itemWidth).text("a[" + i + "]");
            arrayContainer.append(newArrayItem);

            var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).height(itemHeight).text(arrayToSort[i]);
            container.append(newItem);

            if (iPointerContainer.length > 0) {
                var pointerI = $('<div>').attr('id', 'iPointer' + i).width(itemWidth);
                iPointerContainer.append(pointerI);
            }

            if (jPointerContainer.length > 0) {
                var pointerJ = $('<div>').attr('id', 'jPointer' + i).width(itemWidth);
                jPointerContainer.append(pointerJ);
            }
        }

        return arrayToSort;
    };
    AlgoRythmics.highlightCodeBlock = async function (selector) { };

    /*
     * Start an algorithm
     */
    AlgoRythmics.startAlgorithm = async function (array) { };
    /*
     * It will be used in code building: hides the remained pointers
     */
    AlgoRythmics.cleanUp = async function (previousI) { };
    /*
     * When the algorithm is finished clears all previous data and send a message to the user
     */
    AlgoRythmics.finishAlgorithm = function () {
    };
    /*
     * Delay between two parts of the animation
     */
    AlgoRythmics.delay = async function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms || AlgoRythmics.delayInMs));
    };
    /*
     * If there is a new cycle, visualize it using hr
     */
    AlgoRythmics.newCycle = function () { };
    /*
     * Changing the speed value of the animation
     */
    AlgoRythmics.changeDelayLimits = async function (value) {
        AlgoRythmics.delayInMs = value;
    };
    /*
     * When start button is pressed start the algorithm
     */ 
    AlgoRythmics.startButtonListener = function () {
        $('#speedContainer').show();
        console.log("click");

        var arrayCount = parseInt($('#ItemCount').val());
        if (arrayCount !== arrayCount) {
            arrayCount = 10;
        }
        if (arrayCount > 0) {
            this.stopSignal = false;
            Utilities.initOperationLog();
            $('.animationButton').removeClass('disabledButton');
            $('#hintButton').removeClass('disabledButton');
            $('#StartAnimation').addClass('disabledButton');
            $('#StopAnimation').removeClass('disabledButton');
            $('#PauseAnimation').removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause').removeClass('disabledButton');
            //$('#PlayAnimation').addClass('disabledButton');
            this.pauseSignal = false;
            console.log("if");


            
            if (this.algorithmType == "Searching_Backtracking") {
                if (arrayCount != 4)
                    arrayCount = 4;
                setTimeout(async function () {
                    await AlgoRythmics.startAlgorithm(arrayCount);
                }, 500);
            } else {
                var arrayToSort = this.initArray(arrayCount, this.inputType, this.displayType, this.teacherInput);

                if (this.algorithmType == "Searching") {
                    if (this.algorithmIsRecursive) {
                        arrayForSearch = this.initArrayExetended(arrayCount, this.inputType, this.displayType, this.teacherInput, 2);
                    } else {
                        arrayForSearch = arrayToSort;
                    }
                    $('#searchInputNeeded').removeClass('invisible');
                    $('#searchingValueContainer').removeClass('invisible');
                    $('.searchValue').addClass('blink');
                    $(".elementFoundCode").removeClass("highlightedCode");
                    $('#value').prop('readonly', (this.inputType == 3) ? (true) : (false)).removeClass("compareCorrect compareWrong").val((this.inputType == 3) ? (this.searchTarget) : ("-"));
                    $('#options').addClass('invisible');
                    if (this.inputType == 3) {
                        $('#value').trigger("change");
                    } else {
                        $('#value').prop('disabled', false);
                    }
                }
                else {
                    setTimeout(async function () {
                        await AlgoRythmics.startAlgorithm(arrayToSort);
                        $('#StopAnimation').click();
                    }, 500);
                }
            }
        }
    };

    //SEARCHING ALGORITHMS related functions

    /*
     * Compate the wanted element with the specific element from the array 
     */
    AlgoRythmics.searchAlgorithmCompare = async function (array, pointer) {

        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }

        var a1 = $('#value');
        var elements = $('#ItemContainer').find('div');
        var a2 = elements.eq(pointer);
        //var key = a1.val();
        var key = 'x';

        console.log("Compare: " + key + "," + pointer);

        Utilities.logOperation('Compare( ' + key + ',' + ' a[' + pointer + '])', 1);

        if (parseInt(a1.val()) == parseInt(array[pointer])) {
            a1.addClass('compareCorrect');
            a2.addClass('compareCorrect');
            await this.delay(500);
        }
        else {
            a1.addClass('compareWrong');
            a2.addClass('compareWrong');
            await this.delay(500);
        }

        await this.delay(this.delayInMs);

        a1.removeClass('compareWrong').removeClass('elementInSelect').removeClass('compare');
        a2.removeClass('compareWrong').removeClass('elementInSelect').removeClass('compare');

        await this.delay(this.delayInMs);

    }
    /*
     * Select a specific element from the array
     */ 
    AlgoRythmics.searchAlgorithmSelect = async function (array, pointer) {

        $('.searchValue').removeClass('blink');
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }

        var elements = $('#ItemContainer').find('div');
        var a1 = $('#value');
        var a2 = elements.eq(pointer);

        Utilities.logOperation("Select(a[" + pointer + "])", 0);

        $('#previousMovements').removeClass("invisible");
        a1.addClass('compare');
        a2.addClass('compare');

        await this.delay(this.delayInMs);
    }
    /*
     * When wanted element is found or the array does not contain it the search is terminated
     */ 
    AlgoRythmics.searchIsTerminated = async function (keyFounded, position) {
        if (!this.stopSignal) {
            $('.nextStepLinkContainer').removeClass('invisible');
            $('#thirdTip').addClass('active').removeClass('invisible');
            $('.needHelp').addClass('invisible');
            $('#previousMovements').addClass('seen');
            $('#listofMovements').addClass('seen'); // TODO: invalidId
            $('#options').addClass('invisible');
            var elem = document.getElementById('messages');
            if (elem != undefined) {
                elem.scrollTop = elem.scrollHeight;
                }
            console.log("The search is terminated");
        }
        if (keyFounded == true) {
            $('#finalMessage').text("You have successfully completed the animation learning step! You have found the wanted item at position: " + position);
        }
        else {
            $('#finalMessage').text("You have successfully completed the animation learning step! The array did not contain the wanted item.");

        }
    }

    
    //!!!!!SORTING ALGORITHMS related functions - basic operations (select, compare, swap)
    /*
     * Compare two elements of an array using animation
     */
    AlgoRythmics.compare = async function (array1, array2, pointer1, pointer2, beforeAnimationCallbak, afterAnimationCallback) {

        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        console.log("Compare: " + pointer1 + "," + pointer2);

            var elements = $('#ItemContainer').find('div');

            var a1 = elements.eq(pointer1);
            var a2 = elements.eq(pointer2);

            Utilities.logOperation('Compare(a[' + pointer1 + '] ,' + ' a[' + pointer2 + '])', 1);

            if (parseInt(a1.text()) > parseInt(array2[pointer2])) {
                if (typeof beforeAnimationCallbak == 'function') {
                    beforeAnimationCallbak();
                }
                animatedComparsion(a1, a2, this.delayInMs / 2);
                if (typeof afterAnimationCallback == 'function') {
                    afterAnimationCallback();
                }
            }

            else {
                if (typeof beforeAnimationCallbak == 'function') {
                    beforeAnimationCallbak();
                }
                animatedComparsion(a2, a1, this.delayInMs / 2);
                if (typeof afterAnimationCallback == 'function') {
                    afterAnimationCallback();
                }
            }
            await this.delay(this.delayInMs);

            a1.removeClass('compare').removeClass('elementInSelect');
            a2.removeClass('compare').removeClass('elementInSelect');
     
    };
    /*
     * Swap two elements of an array using animation
     */
    AlgoRythmics.swap = async function (array1, array2, position1, position2) {
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        console.log("Swap: " + position1 + "," + position2);

        var aux = array1[position1];
        array1[position1] = array2[position2];
        array2[position2] = aux;

        var el1 = $('#a' + position1);
        var el2 = $('#a' + position2);
        el1.addClass('elementInSelect');
        el2.addClass('elementInSelect');

        Utilities.logOperation("Swap(a[" + position1 + "], a[" + position2 + "])", 2); 

        el1.addClass('swap');
        el2.addClass('swap');

        var hDistance = el1.offset().left - el2.offset().left;
        var vDistance = el1.offset().top - el2.offset().top;

        var duration = this.delayInMs / 2;

        el2.animate({ left: hDistance / 2, top: (vDistance / 2) - 5 }, duration, function () {
            el2.animate({ left: hDistance, top: vDistance }, duration, function () {
                el2.css({ left: 0, top: 0 });
            });
        });
        el1.animate({ left: -hDistance / 2, top: (vDistance / 2) + 5 }, duration, function () {
            el1.animate({ left: -hDistance, top: vDistance }, duration, function () {
                el1.css({ left: 0, top: 0 });
            });
        });        

        await this.delay(this.delayInMs);

        swap(el1, el2);
        el1.removeClass('swap').removeClass('elementInSelect');
        el2.removeClass('swap').removeClass('elementInSelect');

        var auxId = el1.attr('id');
        el1.attr('id', el2.attr('id'));
        el2.attr('id', auxId);
    };
    /*
    * User wants to select next two values to compare
    */
    AlgoRythmics.select = async function (array, pointer1, pointer2) {

        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        
        var elements = $('#ItemContainer').find('div');
        var a1 = elements.eq(pointer1);
        var a2 = elements.eq(pointer2);

        Utilities.logOperation("Select(a[" + pointer1 + "], a[" + pointer2 + "])", 0);

        $('#previousMovements').removeClass("invisible");
        a1.addClass('compare');
        a2.addClass('compare');
       
        await this.delay(this.delayInMs);
    };
    /*
     * If an item is already at his sorted place
     */
    AlgoRythmics.addCorrectPosition = function (array, start, end) {
        if (this.stopSignal == false) {
            for (var i = start; i < end; ++i) {
                var element = $('#a' + i);
                element.addClass("sortedElement");
            }
        }
    };

    ///Divide and Conquer algorithms

    AlgoRythmics.treeSwap = async function (items, leftIndex, rightIndex, container, offset) {
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
        var numbers = container.children();
        Utilities.logOperation("Swap(a[" + leftIndex + "], a[" + rightIndex + "])", 2);
        var left = numbers.eq(leftIndex - offset).addClass('selected');
        var right = numbers.eq(rightIndex - offset).addClass('selected');
        //container.children('div:eq('+leftIndex+')').eq(0).before(right);

        left.addClass('swap');
        right.addClass('swap');

        var hDistance = left.offset().left - right.offset().left;
        var vDistance = left.offset().top - right.offset().top;

        var duration = this.delayInMs / 2;

        left.animate({ left: hDistance / 2, top: (vDistance / 2) - 5 }, duration, function () {
            left.animate({ left: hDistance, top: vDistance }, duration, function () {
                left.css({ left: 0, top: 0 });
            });
        });
        right.animate({ left: -hDistance / 2, top: (vDistance / 2) + 5 }, duration, function () {
            right.animate({ left: -hDistance, top: vDistance }, duration, function () {
                right.css({ left: 0, top: 0 });
            });
        });
        

        ////////////////////////////////////////
        left.clone().insertAfter(right);
        right.clone().insertAfter(left);
        left.remove();
        right.remove();
        await this.delay(this.delayInMs);
        $('.selected').removeClass('selected');
        if (this.displayType == this.Enums.DisplayMode.Blackbox)
            $('.swap').addClass('blackBoxMode');
        $('.swap').removeClass('swap');
    };

    AlgoRythmics.treeInsert = async function (result, tempVal, container, length,index) {
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        //result.push(tempVal);
        await this.delay(this.delayInMs);
        Utilities.logOperation("Insert(a[" + index + "])", 0);
        var selected2 = this.updateArray(result, container, 0, length);
        await this.delay(this.delayInMs / 2);
        if (this.displayType == this.Enums.DisplayMode.Blackbox)
            $('.selected').addClass('blackBoxMode');
        $('.selected').removeClass('selected');
    };

    AlgoRythmics.treeSelect = async function (leftElm, rightElm, leftInd, rightInd) {//smaller bigger
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        if (rightElm != null && leftElm != null) {
            leftElm.classList.add('selected');
            rightElm.classList.add('selected');
            leftElm.classList.remove('blackBoxMode');
            rightElm.classList.remove('blackBoxMode');
            Utilities.logOperation("Select(a[" + leftInd + "], [" + rightInd + "])", 0);
        } else if (rightElm == null && leftElm != null) {
            leftElm.classList.add('selected');
            leftElm.classList.remove('blackBoxMode');
            Utilities.logOperation("Select(a[" + leftInd + "])", 0);
        } else {
            rightElm.classList.add('selected');
            rightElm.classList.remove('blackBoxMode');
            Utilities.logOperation("Select(a[" + rightInd + "])", 0);
        }

        await this.delay(this.delayInMs);
    };

    AlgoRythmics.treeCompare = async function (leftElm, rightElm, leftInd, rightInd) {//smaller bigger
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        if (rightElm != leftElm) {
            Utilities.logOperation('Compare(a[' + leftInd + '] ,' + ' a[' + rightInd + '])', 1);
            await animatedComparsion($(rightElm), $(leftElm), this.delayInMs/2);
            await this.delay(this.delayInMs);
            if (this.displayType == this.Enums.DisplayMode.Blackbox)
                $('.selected').addClass('blackBoxMode');
            rightElm.classList.remove('selected');
            leftElm.classList.remove('selected');
        }
        await this.delay(this.delayInMs);
    };

    //Recursive Searching methods

    AlgoRythmics.searchTreeCompare = async function (selected, index, mode) {

        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }

        var a1 = $('#value');
        var a2 = $(selected);
        //var key = a1.val();
        var key = 'x';

        console.log("Compare: " + key + "," + index);

        Utilities.logOperation('Compare( ' + key + ',' + ' a[' + index + '])', 1);

        if (mode == 'greater') {
            a1.addClass('compareWrong');
            a2.addClass('compareWrong');
            await animatedComparsion(a2, a1, 500);
        } else if (mode == 'less') {
            a1.addClass('compareWrong');
            a2.addClass('compareWrong');
            await animatedComparsion(a1, a2, 500);
        } else {
            a1.addClass('compareCorrect');
            a2.addClass('compareCorrect');
            await this.delay(500);
        }
        
        await this.delay(this.delayInMs);
        if (this.displayType == this.Enums.DisplayMode.Blackbox) {
            a2.addClass('blackBoxMode');
        }
        a1.removeClass('compareWrong').removeClass('elementInSelect').removeClass('compare');
        a2.removeClass('compareWrong').removeClass('elementInSelect').removeClass('compare');

        await this.delay(this.delayInMs);

    }


    AlgoRythmics.searchTreeSelect = async function (selected,index) {

        $('.searchValue').removeClass('blink');
        if (this.pauseSignal == true) {
            await waitForUserInteruption('play');
        }
        
        var a1 = $('#value');
        var a2 = $(selected);

        Utilities.logOperation("Select(a[" + index + "])", 0);

        $('#previousMovements').removeClass("invisible");
        a1.addClass('compare');
        a2.addClass('compare');
        a2.removeClass('blackBoxMode');


        await this.delay(this.delayInMs);
    }

    /*
     * When the array is sorted send a message to the user
     */
    AlgoRythmics.arrayIsSorted = async function () {
        $('#ItemContainer > div').addClass('sortedElement');
    };
    /*
     * Increment the value of a pointer
     * 
     * TODO!!!!!!!! can we use this in all the Learning steps instead of all those specific methods implemented almost everywhere?
     */
    AlgoRythmics.iterate = async function (array, arrayName, pointer, pointerName, value, mode) {
        this.delay(this.delayInMs);
        $('#CurrentMovement').text("Iterate");
        if (mode == 'ASC') {
            var newValue = pointer + value;
        }
        else {
            var newValue = pointer - value;
        }
        console.log("ITERATE: Iterate pointer ");
    };

    //POINTER related functions (codebuilding)
    /*
     * Give the pointer a certain value
     * TODO:    Is this used anywhere?
     */
    AlgoRythmics.placePointer = async function (pointerName, pointerValue) {
        var el1 = '#a' + pointerValue;
        $(el1).addClass('compare');
    };
    /*
     * It will be used in code building: places the next pointer
     */
    AlgoRythmics.increment = async function (pointerName, pointer) {};
   
    AlgoRythmics.sound = async function (pointerName) { };

    // 'Private' methods:
    function shuffle(array) {
        var tmp, current, top = array.length;
        if (top) while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
        return array;
    };

    function animatedComparsion(biggerEl, smallerEl, duration) {
        var grow = {
            marginLeft: '-=5',
            marginRight: '-=5',
            //width: '+=10',
            height: '+=10'
        };

        var shrink = {
            marginLeft: '+=5',
            marginRight: '+=5',
            //width: '-=10',
            height: '-=10'
        };

        biggerEl.animate(grow, duration, 'linear', function () {
            biggerEl.animate(shrink, duration, 'linear');
        });
        smallerEl.animate(shrink, duration, 'linear', function () {
            smallerEl.animate(grow, duration, 'linear');
        });
    }


    AlgoRythmics.markWithPointer = async function (container, position, type, isFull, text, needsDelay) {
        if (isFull) {
            $($(container).children('.item')[position]).addClass(' ' + type + 'PointerFull');//.text(text);
        } else {
            $($(container).children('.item')[position]).addClass(' ' + type + 'PointerEmpty');//.text(text);
        }
        if (needsDelay == true)
            await this.delay(this.delayInMs/2);
    };

    AlgoRythmics.clearPointers = async function (container, needsDelay) {
        $(container).children('.item').removeClass().addClass("item");//.text('');
        if (needsDelay == true)
            await this.delay(this.delayInMs/2);
    };

    AlgoRythmics.fadeAway = async function (Workspace) {
        $(Workspace).find('.ItemContainer > .item').addClass('faded');
        $(Workspace).addClass('faded');
        await this.delay(this.delayInMs*2);
    };

    AlgoRythmics.fadeIn = async function (Workspace) {
        $(Workspace).find('.ItemContainer > .item').removeClass('faded');
        $(Workspace).removeClass('faded');
        await this.delay(this.delayInMs*2);
    };

    AlgoRythmics.RecursiveCall = function (functionName, lowerIndex, upperIndex) {
        Utilities.logOperation(functionName + '(a[' + lowerIndex + '...' + upperIndex + '])', 1);
    };

    AlgoRythmics.RecursiveReturn = function () {
        Utilities.logOperation('Return', 1);
    };

    AlgoRythmics.updateArray = function (array, container, begin, end) {
        container.empty();
        //var itemWidth = Math.max(Math.floor(container.innerWidth() / array.length) - 10, 30);
        //var itemWidth = Math.min(Math.floor(container.innerWidth() / end-begin) - 10, 30);
        if ((end - begin) <= array.length) {
            for (var i = begin; i < end; ++i) {
                var itemHeight = 50;
                if (this.displayType != this.Enums.DisplayMode.Blackbox) {
                    var divid = 1;
                    if (array[i] > 10)
                        divid = 3;
                    itemHeight = 50 + array[i] * 5 / divid;
                }
                var itemWidth = Math.min(Math.floor(container.innerWidth() / array.length) - 10, 30);
                var newItem = $('<div>').attr('id', 'a' + i).addClass("item").addClass("sortedElement").width(itemWidth).css("flex-basis", itemWidth).height(itemHeight).text(array[i]);
                if (this.displayType == this.Enums.DisplayMode.Blackbox) {
                    newItem.addClass('blackBoxMode');
                }
                container.append(newItem);
            }
        }
        else {
            for (var i = 0; i < array.length; ++i) {
                var itemHeight = 50;
                if (this.displayType != this.Enums.DisplayMode.Blackbox) {
                    var divid = 1;
                    if (array[i] > 10)
                        divid = 3;
                    itemHeight = 50 + array[i] * 5 / divid;
                }
                var itemWidth = Math.min(Math.floor(container.innerWidth() / array.length) - 10, 30);
                var newItem = $('<div>').attr('id', 'a' + i).addClass("item").addClass("sortedElement").width(itemWidth).css("flex-basis", itemWidth).height(itemHeight).text(array[i]);
                if (this.displayType == this.Enums.DisplayMode.Blackbox) {
                    newItem.addClass('blackBoxMode');
                }
                container.append(newItem);
            }
            for (var i = 0; i < (end - begin - array.length); i++) {
                console.log(" * " + i);
                var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).css("flex-basis", itemWidth).height(0).text(' ');
                if (this.displayType == this.Enums.DisplayMode.Blackbox) {
                    newItem.addClass('blackBoxMode');
                }
                container.append(newItem);
            }
        }
    };

    AlgoRythmics.displayArray = function (array, parent, begin, end, level, side) {
        var mainContainer = $('<div>').addClass('Array').addClass(side + '_side');
        var workspace = $('<div>').addClass('Workspace');
        var iPointerContainer = $('<div>').addClass('iPointerContainer').hide();
        var jPointerContainer = $('<div>').addClass('jPointerContainer').hide();
        var arrayContainer = $('<div>').addClass('ArrayItemsContainer');
        var container = $('<div>').addClass('ItemContainer');
        var LowerContainer = $('<div>').addClass('LowerContainer');

        var itemWidth = Math.max(Math.floor(container.innerWidth() / array.length) - 10, 30);
        
        for (var i = begin; i < end; ++i) {
            var newArrayItem = $('<div>').addClass("item").height(30).width(itemWidth).css("flex-basis", itemWidth).text("a[" + i + "]");
            arrayContainer.append(newArrayItem);
            var itemHeight = 50;
            if (this.displayType != this.Enums.DisplayMode.Blackbox) {
                var divid = 1;
                if (array[i] > 10)
                    divid = 3;
                itemHeight = 50 + array[i] * 5 / divid;
            }


            var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).css("flex-basis", itemWidth).height(itemHeight).text(array[i]);
            container.append(newItem);

            if (this.displayType == this.Enums.DisplayMode.Blackbox) {
                newItem.addClass('blackBoxMode');
            }

            if (iPointerContainer.length > 0) {
                var pointerI = $('<div>').attr('id', 'iPointer' + i).height(30).css("flex-basis", 30).addClass("item");
                iPointerContainer.append(pointerI);
            }

            if (jPointerContainer.length > 0) {
                var pointerJ = $('<div>').attr('id', 'jPointer' + i).height(30).css("flex-basis", 30).addClass("item");
                jPointerContainer.append(pointerJ);
            }
        }
        workspace.append(iPointerContainer);
        workspace.append(jPointerContainer);
        workspace.append(arrayContainer);
        workspace.append(container);
        mainContainer.append(workspace);
        mainContainer.append(LowerContainer);
        if (!$(parent).hasClass('Tray'))
            $(mainContainer).css(side, (parent.innerWidth() / 2) + 'px');
        parent.append(mainContainer);
        console.log(LowerContainer);
        return LowerContainer;
    };

    function swap(a, b) {
        var tmp = $('<span>').hide();
        a.before(tmp);
        b.before(a);
        tmp.replaceWith(b);
    }

    function finishCourse() {
        $.post("/Courses/" + AlgoRythmics.courseId)   // TODO: this URL is OK? Seems like too simple...
            .done(function () {
                console.log("Finished course");
            })
            .fail(function () {
                console.log("Error finishing the course");
            });
    }

    async function waitForUserInteruption(actionName) {
        currentAction = actionName;
        return new Promise(function (resolve, reject) {
            promiseActionResolver = resolve;
        });
    }

    ///////////////////////////////////////////Backtracking 


    AlgoRythmics.update_board = function (board, parent, indexTable) {
        var _cellBlack, _cellWhite, _crown;

        var gridContainer = $(parent).children('.DecorContainer').children('.Board');
        var indexContainer = gridContainer.siblings('.SideContainer').children('.IndexContainer');
        gridContainer.empty();
        for (var j = 0; j < board.length; j++) {
            for (var i = 0; i < board.length; i++) {
                _cellBlack = $('<div>').addClass('black').width(Math.floor(gridContainer.innerWidth() / board.length)).height(Math.floor(gridContainer.innerHeight() / board.length)),
                    _cellWhite = $('<div>').addClass('white').width(Math.floor(gridContainer.innerWidth() / board.length)).height(Math.floor(gridContainer.innerHeight() / board.length));
                _cellBlack.empty();
                _cellWhite.empty();
                if (board[i][j] == 1) {
                    _crown = $('<img src="https://img.icons8.com/officel/16/000000/crown.png">');
                    _cellBlack.append(_crown);
                    _crown = $('<img src="https://img.icons8.com/officel/16/000000/crown.png">');
                    _cellWhite.append(_crown);
                } else {
                    _cellBlack.text('');
                    _cellWhite.text('');
                }
                if ((i + j) % 2 == 0) {
                    gridContainer.append(_cellBlack);
                } else {
                    gridContainer.append(_cellWhite);
                }
            }
        }

        indexContainer.empty();
        for (var i = 0; i < board.length; i++) {
            var index = $('<div>').addClass('white').text(indexTable[i] + 1);
            indexContainer.append(index);
        }
    };

    AlgoRythmics.print_board = function (board, parent) {
        var _cellBlack, _cellWhite, _crown;
        var boardContainer = $('<div>').addClass('BoardContainer').addClass('column');
        var decorContainer = $('<div>').addClass('DecorContainer');
        var indexContainer = $('<div>').addClass('IndexContainer');
        var upperIndices = $('<div>').addClass('UpperIndices');
        var sideIndices = $('<div>').addClass('SideIndices');
        var sideContainer = $('<div>').addClass('SideContainer');
        var gridContainer = $('<div>').addClass('Board').css('grid-template-columns', 'repeat(' + board.length + ', 1fr)');
        decorContainer.append(upperIndices);
        decorContainer.append(gridContainer);
        sideContainer.append(sideIndices);
        sideContainer.append(indexContainer);
        decorContainer.append(sideContainer);
        //side table to decor
        boardContainer.append(decorContainer);

        for (var i = 0; i < board.length; i++) {
            var index = $('<div>').text(i + 1);
            upperIndices.append(index);
            var index = $('<div>').text(board.length - i);
            sideIndices.append(index);
            var index = $('<div>').addClass('white').text(' ');
            indexContainer.append(index);
        }

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board.length; j++) {
                _cellBlack = $('<div>').addClass('black').width(Math.floor(gridContainer.innerWidth() / board.length)).height(Math.floor(gridContainer.innerHeight() / board.length)),
                    _cellWhite = $('<div>').addClass('white').width(Math.floor(gridContainer.innerWidth() / board.length)).height(Math.floor(gridContainer.innerHeight() / board.length));
                if (board[i][j] == 1) {
                    _crown = $('<img src="https://img.icons8.com/officel/16/000000/crown.png">');
                    _cellBlack.append(_crown);
                    _crown = $('<img src="https://img.icons8.com/officel/16/000000/crown.png">');
                    _cellWhite.append(_crown);
                } else {
                    _cellBlack.text('');
                    _cellWhite.text('');
                }
                if ((i + j) % 2 == 0) {
                    gridContainer.append(_cellBlack);
                } else {
                    gridContainer.append(_cellWhite);
                }
            }
        }
        $(parent).append(boardContainer);
        return boardContainer;
    };

    AlgoRythmics.markSpot = function(y, x, length, container, marker) {
        var children = container.children();
        $(children[x * length + y]).addClass(marker);
    };

    AlgoRythmics.clearMarkings = function () {
        $('.checked').removeClass('checked');
        $('.found').removeClass('found');
        $('.good').removeClass('good');
    };


    AlgoRythmics.shade = function (container, brightness) {
        container.children().each(function (i) {
            var color = $(this).css("background-color");
            color = color.replace(/[^0-9,]+/g, "");
            var red = color.split(",")[0];
            var green = color.split(",")[1];
            var blue = color.split(",")[2];
            
            color = "rgb(" + (red - brightness) + "," + (green - brightness) + "," + (blue - brightness) + ")";
            this.style.backgroundColor = color;
        });
    };

    ////////////////////////////////////////////



    $(document).ready(function () {

        $('.animationButton').addClass('disabledButton');
        $('#StopAnimation').addClass('disabledButton');
        $('#PauseAnimation').addClass('disabledButton').addClass('glyphicon glyphicon-pause');

        $('#hintButton').addClass('disabledButton');
        $("#finishCourse").click(function () {
            finishCourse();
        });

        if ($('#animationSpeed').length > 0) {
            AlgoRythmics.changeDelayLimits(6 * (200 - $('#animationSpeed').val()));
        }

        $('#StopAnimation').click(function () {
            $('#StartAnimation').removeClass('disabledButton');
            $('#PauseAnimation').addClass('disabledButton');
            $('.animationButton').addClass('disabledButton');
            $('#hintButton').addClass('disabledButton');
            $('#PlayAnimation').addClass('disabledButton');
            $(this).addClass('disabledButton');;
            AlgoRythmics.stopSignal = true;
        });

        $('#slideContainer').on('change', function () {
            AlgoRythmics.changeDelayLimits(4 * (200 - $('#animationSpeed').val()));
        });

        $('#StartAnimation').on('click', function () {
            AlgoRythmics.startButtonListener();

        });

        $('#PauseAnimation').on('click', function () {
            if (AlgoRythmics.pauseSignal == false) {
                $('.animationButton').addClass('disabledButton');
                $('#hintButton').addClass('disabledButton');
                $('#PauseAnimation').removeClass('glyphicon glyphicon-pause').addClass('glyphicon glyphicon-play');
                $('#PlayAnimation').removeClass('disabledButton');
                AlgoRythmics.pauseSignal = true;
            }
            else {
                $('.animationButton').removeClass('disabledButton');
                $('#hintButton').removeClass('disabledButton');
                $('#PauseAnimation').removeClass('glyphicon glyphicon-play').addClass('glyphicon glyphicon-pause');;
                $('#PauseAnimation').removeClass('disabledButton');
                AlgoRythmics.pauseSignal = false;
            }
            if ($(event.target).data('action') == currentAction) {
                currentAction = '';
                promiseActionResolver();

            } 
        });

        //$('#PauseAnimation').on('click', function () {
        //    if (AlgoRythmics.pauseSignal == true) {
               
                
                
        //    }
        //});

        $('#value').on('change', function () {
            $('#searchInputMessage').text("You need to find x which is equal to " + $('#value').val());
            $('#options').removeClass('invisible');
            setTimeout(async function () {
                await AlgoRythmics.startAlgorithm(arrayForSearch);
                $('#StopAnimation').click();
            }, 500);
        });

        $('#ItemCount').on('change', function () {
            console.log($('#ItemCount').val());
            $('#StopAnimation').click();
            if ($('#ItemCount').val() > 10 || $('#ItemCount').val() <= 0) {
                $('#lengthError').removeClass('hidden');
                $('#StartAnimation').prop('disabled', true);
            }
            else {
                $('#lengthError').addClass('hidden');
                $('#StartAnimation').removeClass('disabledButton');
            }
        });
         
    });




    return AlgoRythmics;

})(jQuery);