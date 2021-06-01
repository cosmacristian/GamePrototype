'use strict';
(function ($, AlgoRythmics) {

    var _super = $.extend({}, AlgoRythmics);

    var algorithmPhase = 0;
    var hintOrderNumber = 0;
    var defaultCourse = false;
    var optionId = 0; 
    var slow = 1000;
    var animationInProgress = false;

    /*
     * If there is a new cycle add a new horizontal row
     */ 
    AlgoRythmics.newCycle = function () {
        Utilities.logOperationSeparator();
    }

    /*
     *  Select in control type components
     */
    AlgoRythmics.startButtonListener = function () {
        initStepDetails();
        hintListeners();
        _super.startButtonListener.call(this);
    }

    //SORTING ALGORITHMS related functions
    /*
     * Visual part of the compare method when the playback is interactive
     */
    AlgoRythmics.compare = async function (array1, array2, pointer1, pointer2) {

        optionId = 1;
        nextMovementHint("compare");
        await waitForUserInput('compare');
        animationInProgress = true;
        hideHints();
        await _super.compare.call(this, array1, array2, pointer1, pointer2);
        animationInProgress = false;
    };

    /*
     * Visual part of the swap method when the playback is interactive
     */
    AlgoRythmics.swap = async function (array1, array2, position1, position2) {

        optionId = 2;
        var el1 = $('#a' + position1);
        var el2 = $('#a' + position2);
        el1.addClass('elementInSelect');
        el2.addClass('elementInSelect');
        nextMovementHint("swap");
        await waitForUserInput('swap');
        animationInProgress = true;
        hideHints();
        await _super.swap.call(this, array1, array2, position1, position2);
        animationInProgress = false;
    };

    /*
     * Visual part of the select method: the user needs to select those two elements that need to be compared
     */
    AlgoRythmics.select = async function (array, pointer1, pointer2) {

        optionId = 0;
        var elements = $('#ItemContainer').find('div');
        elements.removeClass('elementInSelect')
        nextMovementHint("Select a[" + pointer1 + "] cell");
        await waitForUserSelect(pointer1, pointer2);
        hideHints();
        elements.eq(lastPointer).addClass('elementInSelect');
        if (lastPointer == pointer1) {
            nextMovementHint("Select a[" + pointer2 + "] cell");
            await waitForUserSelect(-1, pointer2);
        }
        else {
            nextMovementHint("Select a[" + pointer1 + "] cell");
            await waitForUserSelect(pointer1, -1);
        }

        hideHints();

        Utilities.logOperation("Select: a[" + pointer1 + "], a[" + pointer2 + "]", 0);

        $('#previousMovements').removeClass("invisible");
        elements.eq(lastPointer).addClass('elementInSelect');
        $('#compareButton,#swapButton').removeClass('animationButtonInactive').addClass('animationButton');
    };

    //SEARCHING ALGORITHMS related functions
    /*
     * Visual part of the compare method when the playback is interactive and the algorithm type is searching
     */ 
    AlgoRythmics.searchAlgorithmCompare = async function (array, position) {
        optionId = 1;
        nextMovementHint("compare");
        await waitForUserInput('compare');
        hideHints();
        await _super.searchAlgorithmCompare.call(this, array, position);
    }
    /*
     * Visual part of the select method: the user needs to select one item that needs to be compared with wanted value
     */
    AlgoRythmics.searchAlgorithmSelect = async function (array, position) {

        $('.searchValue').removeClass('blink');
        optionId = 0;
        var elements = $('#ItemContainer').find('div');
        elements.removeClass('elementInSelect')
        nextMovementHint("Select a[" + position + "] cell");
        await waitForUserSelect(position, -1);
        hideHints();
        elements.eq(position).addClass('elementInSelect');
        hideHints();

        Utilities.logOperation("Select: a[" + position + "]", 0);

        $('#previousMovements').removeClass("invisible");
        elements.eq(position).addClass('elementInSelect');
    }
    /*
     * The algorithm has finished and the array is sorted
     */
    AlgoRythmics.arrayIsSorted = async function () {
        if (!this.stopSignal) {
            $('.nextStepLinkContainer').removeClass('invisible');
            $('#secondTip').addClass('seen');
            $('#thirdTip').addClass('active').removeClass('invisible');
            $('#options').addClass('invisible');
            $('.needHelp').addClass('invisible');
            $('#secondTipRequest').addClass('invisible');
            $('#ItemContainer > div').addClass('sortedElement');
            var elem = document.getElementById('messages');
            elem.scrollTop = elem.scrollHeight;
            console.log("The array is sorted");
        }
    };

    //Divide and Conquer 
    var workspaceStack = [];
    var correctElements = [];       ///we should check if it is the correct div
    var selectedSoFar = 0;

    async function waitForUserSelectExtended(actionName) {
        currentAction = actionName;
        if (actionName = 'selecttwo') {
            selectedSoFar = 0;
        }
        return new Promise(function (resolve, reject) {
            promisePointerResolver = resolve;
        });
    }

    AlgoRythmics.treeSwap = async function (items, leftIndex, rightIndex, container, offset) {
        //await waitForUserSelectExtended('swap');
        var numbers = container.children();
        numbers.eq(leftIndex - offset).addClass('selected');
        numbers.eq(rightIndex - offset).addClass('selected');
        numbers.eq(leftIndex - offset).removeClass('blackBoxMode');
        numbers.eq(rightIndex - offset).removeClass('blackBoxMode');
        optionId = 2;
        nextMovementHint("swap");
        await waitForUserInput('swap');
        animationInProgress = true;
        hideHints();
        await _super.treeSwap.call(this, items, leftIndex, rightIndex, container, offset);
        animationInProgress = false;
    };

    AlgoRythmics.treeInsert = async function (result, tempVal, container, length,index) {
        optionId = 2;
        nextMovementHint("insert");
        await waitForUserInput('insert');
        animationInProgress = true;
        hideHints();
        await _super.treeInsert.call(this, result, tempVal, container, length,index);
        animationInProgress = false;
    };

    AlgoRythmics.treeSelect = async function (leftElm, rightElm, leftInd, rightInd) {//smaller bigger

        if (rightElm != null && leftElm != null) {
            if (rightElm != leftElm) {
                optionId = 0;
                nextMovementHint("Select a[" + leftInd + "] & a[" + rightInd + "] cells");
                correctElements.push(rightElm);
                correctElements.push(leftElm);
                await waitForUserSelectExtended('selecttwo');
                animationInProgress = true;
                await _super.treeSelect.call(this, leftElm, rightElm, leftInd, rightInd);
                animationInProgress = false;
                hideHints();
            
            }
        }
        if (rightElm == null && leftElm != null) {
            optionId = 0;
            nextMovementHint("Select a[" + leftInd + "] cell from the left array!");
            correctElements.push(leftElm);
            await waitForUserSelectExtended('selectone');
            animationInProgress = true;
            await _super.treeSelect.call(this, leftElm, rightElm, leftInd, rightInd);
            animationInProgress = false;
            hideHints();
        }
        if (rightElm != null && leftElm == null) {
            optionId = 0;
            nextMovementHint("Select a[" + rightInd + "] cell from the right array!");
            correctElements.push(rightElm);
            await waitForUserSelectExtended('selectone');
            animationInProgress = true;
            await _super.treeSelect.call(this, leftElm, rightElm, leftInd, rightInd);
            animationInProgress = false;
            hideHints();
        }
    };

    AlgoRythmics.treeCompare = async function (leftElm, rightElm, leftInd, rightInd) {//smaller bigger
        if (rightElm != leftElm) {
            //await waitForUserSelectExtended('compare');
            optionId = 1;
            nextMovementHint("compare");
            await waitForUserInput('compare');
            animationInProgress = true;
            hideHints();
            await _super.treeCompare.call(this, leftElm, rightElm, leftInd, rightInd);
            animationInProgress = false;
        }
    };

    //Recursive Searching methods

    AlgoRythmics.searchTreeCompare = async function (selected, index, mode) {
        optionId = 1;
        nextMovementHint("compare");
        await waitForUserInput('compare');
        animationInProgress = true;
        hideHints();
        await _super.searchTreeCompare.call(this, selected, index, mode);
        animationInProgress = false;
    }
    
    AlgoRythmics.searchTreeSelect = async function (selected, index) {

        $('.searchValue').removeClass('blink');
        optionId = 0;
        nextMovementHint("Select(a[" + index + "])");
        correctElements.push(selected);
        await waitForUserSelectExtended('selectone');
        animationInProgress = true;
        hideHints();
        await _super.searchTreeSelect.call(this, selected, index);
        animationInProgress = false;
    }

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
                itemHeight = 50 + array[i] * 5;
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

    AlgoRythmics.markWithPointer = async function (container, position, type, isFull, text) {
        animationInProgress = true;
        await _super.markWithPointer.call(this, container, position, type, isFull, text);
        animationInProgress = false;
    };

    AlgoRythmics.clearPointers = async function (container) {
        animationInProgress = true;
        await _super.clearPointers.call(this, container);
        animationInProgress = false;
    };

    AlgoRythmics.fadeAway = async function (Workspace) {
        animationInProgress = true;
        await _super.fadeAway.call(this, Workspace);
        animationInProgress = false;
    };

    AlgoRythmics.fadeIn = async function (Workspace) {
        animationInProgress = true;
        await _super.fadeIn.call(this,Workspace);
        animationInProgress = false;
    };

    var currentAction = '';
    var promiseActionResolver;
    var promisePointerResolver;
    var currentPointer1 = -1;
    var currentPointer2 = -1;
    var lastPointer = -1;

    async function waitForUserInput(actionName) {
        currentAction = actionName;
        return new Promise(function (resolve, reject) {
            promiseActionResolver = resolve;
        });
    }

    async function waitForUserSelect(actionName1, actionName2) {
        currentPointer1 = actionName1;
        currentPointer2 = actionName2;
        return new Promise(function (resolve, reject) {
            promisePointerResolver = resolve;
        });
    }

    function hintListeners() {

        $('.needHelp').click(function () {


            //if ($(this).hasClass('needHelp1')) {
                var currentHintValue = $('#nextMovementHint').text();
                if (currentHintValue == "compare") {
                    hintOrderNumber = 1;
                }
                else if (currentHintValue == "swap" || currentAction == "insert") {
                    hintOrderNumber = 2;
                }
                else {
                    hintOrderNumber = 0;
                }
            //}

            $('#hintContainer').removeClass('invisible');
            $('#nextMovementHint').removeClass('invisible');
            $('.hint-container').addClass('hintAdded');
            $('#hintMessage').text('Here is some help! Feel free to use it:');
            if (defaultCourse == true) {
                sendAjax("hints", "hintNumber", hintOrderNumber, AlgoRythmics.algorithmId, "Algorithms");
            }
            else {
                sendAjax("hints", "hintNumber", hintOrderNumber, AlgoRythmics.courseId, "Courses", );
            }
            
        });

        $('.closeHint').click(function () {
            $(this).parent().parent().parent().addClass('invisible');
        });
    }

    function nextMovementHint(movement) {
        $('#nextMovementHint').text(movement);
    }

    function hideHints() {
        $('#nextMovementHint').addClass('invisible');
        $('.hint-container').removeClass('hintAdded');
        $('#hintMessage').text('You are awesome! Carry on!');

    }

    function sendAjax(type, typeNumber, orderNumber, modelId, modelType) {
        var url = null;
        if (type == "errors") {
            url = "/" + modelType + "/Details/" + modelId + "/" + AlgoRythmics.learningStepNumber + "/" + type + "/" + 1 + "/" + orderNumber;
        }
        else {
            url = "/" + modelType + "/Details/" + modelId + "/" + AlgoRythmics.learningStepNumber + "/" + type + "/" + orderNumber;
        }
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: url,
            data: "{'" + modelType + "':'" + modelId + "','learningStepNumber':'" + AlgoRythmics.learningStepNumber + "','" + typeNumber + "':'" + orderNumber + "'}",
            async: true,
            success: function (response) {
                console.log(type + ": new one saved in database with order number " + orderNumber);
            },
            error: function () {
                console.log("Error saving " + type + "in database");
            }
        });
    }

    function goToByScroll(id) {
        id = id.replace("link", "");
        $('.elements').animate({
            scrollTop: $("#" + id).offset().top
        }, 'slow');
    }

    function initStepDetails() {

        $('#firstTip').removeClass('active').addClass('seen');
        $('#thirdTip').addClass('invisible').removeClass('active');
        $('#secondTipRequest').removeClass('invisible');
        $('.needHelp').removeClass('invisible');
        $('.needHelp1').removeClass('invisible');
        $('#choiceContainer').removeClass('wrongAnswer');
        $('#choiceContainer').addClass('wellDone');
        $('#progressMessage').text('Everything is awesome! Try to control the animation. Good luck!');
        $('#options').removeClass('invisible');
        $('#secondTip').addClass('invisible');

        Utilities.initOperationLog();
     };

    $(document).ready(function () {
        $('#swapButton,#compareButton,#insertButton').on('click', function (event) {
            if (animationInProgress) {
                return;
            }

            var id = this.id;
            console.log("Selected button id: " + id);
            if (currentAction == "compare") {
                algorithmPhase = 1;
            }
            else if (currentAction == "swap" || currentAction == "insert") {//Cris> This might be changed later
                algorithmPhase = 2;
            }
            else {
                algorithmPhase = 0;
            }

            if ($(event.target).data('action') == currentAction) {
                //$('#statusOk').show().text('Ok!').fadeOut(slow);
                $('#choiceContainer').removeClass('wrongAnswer');
                $('#choiceContainer').addClass('wellDone');
                $('#progressMessage').text('Awesome choice! Incredible!');
                currentAction = '';
                promiseActionResolver();
            } else {
                //$('#statusWrong').show().text('Wrong!').fadeOut(slow);
                $('#choiceContainer').removeClass('wellDone');
                $('#choiceContainer').addClass('wrongAnswer');
                $('#progressMessage').text('That was a bad idea... Try again!');
                if (defaultCourse == true) {
                    sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.algorithmId, "Algorithms");
                }
                else {
                    sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.courseId, "Courses");
                }
            }
        });

        //Divide & Conquer on click - Having multiple workspaces

        $(document).on('click', '.ItemContainer div', function (event) {
            //divide and select
            if (animationInProgress) {
                return;
            }
            if (currentAction == "selecttwo") {
                if (!correctElements.includes(this)) {
                    $('#choiceContainer').removeClass('wellDone');
                    $('#choiceContainer').addClass('wrongAnswer');
                    $('#progressMessage').text('Ooops... You missed this, but do not worry! Try again!');
                    if (defaultCourse == true) {
                        sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.algorithmId, "Algorithms");
                    }
                    else {
                        sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.courseId, "Courses");
                    }
                    return;
                }
                algorithmPhase = 0;
                selectedSoFar += 1;
                this.classList.add('selected');
                this.classList.remove('blackBoxMode');
                if (selectedSoFar == 1) {
                    var index = correctElements.indexOf(this);
                    correctElements.splice(index, 1);
                    $('#choiceContainer').removeClass('wrongAnswer');
                    $('#choiceContainer').addClass('wellDone');
                    $('#progressMessage').text('Perfect! Almost done!');
                }
                if (selectedSoFar == 2) {
                    $('#choiceContainer').removeClass('wrongAnswer');
                    $('#choiceContainer').addClass('wellDone');
                    $('#progressMessage').text('Very well! You are a genious!');
                    correctElements = [];
                    promisePointerResolver();
                }
            } else if (currentAction == "selectone") {
                if (!correctElements.includes(this)) {
                    $('#choiceContainer').removeClass('wellDone');
                    $('#choiceContainer').addClass('wrongAnswer');
                    $('#progressMessage').text('Ooops... You missed this, but do not worry! Try again!');
                    sendAjax("errors", "errorNumber", algorithmPhase);
                    return;
                }
                $('#choiceContainer').removeClass('wrongAnswer');
                $('#choiceContainer').addClass('wellDone');
                $('#progressMessage').text('Very well! You are a genious!');
                this.classList.add('selected');
                algorithmPhase = 0;
                correctElements = [];
                promisePointerResolver();
            }
            else {
                algorithmPhase = 0;
                $('#choiceContainer').removeClass('wellDone');
                $('#choiceContainer').addClass('wrongAnswer');
                $('#progressMessage').text('Ooops... You missed this, but do not worry! Try again!');
                if (defaultCourse == true) {
                    sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.algorithmId, "Algorithms");
                }
                else {
                    sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.courseId, "Courses");
                }
                return;
            }
        });

        $(document).on('click', '#ItemContainer div', function (event) {
            if (animationInProgress) {
                return;
            }
            if (currentAction == "compare") {
                algorithmPhase = 1;
            }
            else if (currentAction == "swap") {
                algorithmPhase = 2;
            }
            else {
                algorithmPhase = 0;
            }
            console.log($(this).index());
            if ($(this).index() == currentPointer1) {
                //$('#statusOk').show().text('Ok!').fadeOut(slow);
                $('#choiceContainer').removeClass('wrongAnswer');
                $('#choiceContainer').addClass('wellDone');
                $('#progressMessage').text('Very well! You are a genious!');
                lastPointer = currentPointer1;
                currentPointer1 = -1;
                currentPointer2 = -1;
                promisePointerResolver();
            }
            else if ($(this).index() == currentPointer2) {
                //$('#statusOk').show().text('Ok!').fadeOut(slow);
                $('#choiceContainer').removeClass('wrongAnswer');
                $('#choiceContainer').addClass('wellDone');
                $('#progressMessage').text('Perfect! Almost done!');
                lastPointer = currentPointer2;
                currentPointer1 = -1;
                currentPointer2 = -1;
                promisePointerResolver();
            }
            else {
                //$('#statusWrong').show().text('Wrong!').fadeOut(slow);
                $('#choiceContainer').removeClass('wellDone');
                $('#choiceContainer').addClass('wrongAnswer');
                $('#progressMessage').text('Ooops... You missed this, but do not worry! Try again!');
                if (defaultCourse == true) {
                    sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.algorithmId, "Algorithms");
                }
                else {
                    sendAjax("errors", "errorNumber", algorithmPhase, AlgoRythmics.courseId, "Courses");
                }
            }
        });
    });

})(jQuery, window.AlgoRythmics);