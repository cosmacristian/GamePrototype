(function ($) {
    /*
    $('#DeleteAlgorithmModal').on('click', '#deleteButton', function () {
            // tODO: get the url!
        var deleteData = $('#DeleteAlgorithmModal').data('deleteData');
               $.post($(deleteData).data('url')).done(function (data) {
               if (data.success) {
                    // close the delete modal
                   $('#DeleteAlgorithmModal').modal('hide').removeData('deleteData');
                   window.location = window.location.href;
                   
                } else {
                   $('#DeleteAlgorithmModalBody').text(data.msg);
                   $('#deleteButton').hide();
                    // print the data.errorMsg
                }
            });
    });

    $('#DeleteAlgorithmModal').on('show.bs.modal', function (e) {
        $('#DeleteAlgorithmModalBody').text("Are you sure you want to delete the selected algorithm? The default course will be deleted too.");
        $('#deleteButton').show();
        $('#DeleteAlgorithmModal').data('deleteData', e.relatedTarget);

        
    });*/

    $(document).ready(function () {
        var selectedAlgorythmId = $("input[name='SelectedAlgorithmId']").val();
        var selectedInput = $("select[name='InputType']").val();
        if (selectedInput != 3) {
            $("div.TeacherInput").hide();
            $("input[name='TeacherInput']").val("");
            $("input[name='ArraySize']").prop("disabled", false);
        } else {
            $("div.TeacherInput").show();
            $("input[name='ArraySize']").prop("disabled", true);
        }
        $("div.SearchTarget").hide();
        $("input[name='SearchTarget']").val("");
        $("input[name='SearchTarget']").prop("disabled", true);
        $('input[algorithm-id="' + selectedAlgorythmId + '"]').click();

        selectedArraySize = $("input[name='ArraySize']").val();
        selectedInputType = $("select[name='InputType']").val();
        selectedDisplayType = $("select[name='Animation']").val();
        selectedTeacherInput = $("input[name='TeacherInput']").val();
        initArray(selectedArraySize, selectedInputType, selectedDisplayType, selectedTeacherInput);
    });

    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    $(document).on("click", ".CheckVideoBtn", function () {
        var dataUrl = "";
        dataUrl = getId($(this).data('url'));
        var convertedUrl = "https://www.youtube.com/embed/" + dataUrl.toString();
        $('#player').attr("src", convertedUrl);
    });

    $(document).on("click", ".algorithmSelectBtn", function () {
        var selectedId = $(this).attr('algorithm-id');
        var selectedType = $(this).attr('algorithm-type');
        $("input[name='SelectedAlgorithmId']").val(parseInt(selectedId));
        $("input[name='SelectedAlgorithmType']").val(selectedType);
        $("div.selected").removeClass("selected");
        $(this).parents("div.algorithmHeader").addClass("selected");

        selectedInputType = $("select[name='InputType']").val();
        if (selectedType == "Sorting") {
            $("div.SearchTarget").hide();
            $("input[name='SearchTarget']").val("");
            $("input[name='SearchTarget']").prop("disabled", true);
        } else {
            if (selectedInputType == 3) {
                $("div.SearchTarget").show();
                $("input[name='SearchTarget']").prop("disabled", false);
            }
        }
    });

    $(document).on("click", ".item", function () {
        var algorithmType = $("input[name='SelectedAlgorithmType']").val();
        if (algorithmType == "Searching") {
            $(".item.selected").removeClass("selected");
            $(this).addClass("selected");
            var selectedValue = $(this).text();
            $("input[name='SearchTarget']").val(selectedValue);
        }
    });
    
    $("input[name='TeacherInput']").change(function () {
        var array = $(this).val();
        var number = array.split(',').length;
        $("input[name='ArraySize']").val(number);

        selectedInputType = $("select[name='InputType']").val();
        selectedDisplayType = $("select[name='Animation']").val();
        initArray(number, selectedInputType, selectedDisplayType, array);
    });

    $("select[name='InputType']").change(function () {
        var selectedOption = $(this).val();
        selectedAlgorithmType = $("input[name='SelectedAlgorithmType']").val();

        if (selectedOption == 3) {
            $("div.TeacherInput").show();
            $("input[name='ArraySize']").prop("disabled", true);
            
            if (selectedAlgorithmType == "Searching") {
                $("div.SearchTarget").show();
                $("input[name='SearchTarget']").prop("disabled", false);
            }
        }
        else {
            $("div.TeacherInput").hide();
            $("input[name='TeacherInput']").val("");
            $("input[name='ArraySize']").prop("disabled", false);

            if (selectedAlgorithmType == "Searching") {
                $("div.SearchTarget").hide();
                $("input[name='SearchTarget']").val("");
                $("input[name='SearchTarget']").prop("disabled", true);
            }
        }

        selectedArraySize = $("input[name='ArraySize']").val();
        selectedDisplayType = $("select[name='Animation']").val();
        selectedTeacherInput = $("input[name='TeacherInput']").val();
        initArray(selectedArraySize, selectedOption, selectedDisplayType, selectedTeacherInput);
    });

    $("select[name='Animation']").change(function () {
        var selectedOption = $(this).val();

        selectedArraySize = $("input[name='ArraySize']").val();
        selectedInputType = $("select[name='InputType']").val();
        selectedTeacherInput = $("input[name='TeacherInput']").val();
        initArray(selectedArraySize, selectedInputType, selectedOption, selectedTeacherInput);
    });

    $("input[name='ArraySize']").change(function () {
        var selectedSize = $(this).val();

        selectedInputType = $("select[name='InputType']").val();
        selectedDisplayType = $("select[name='Animation']").val();
        initArray(selectedSize, selectedInputType, selectedDisplayType, "");
    });

    //displayArray = function () {
    //    var array = []
    //    var mainContainer = $('<div>').addClass('Array');
    //    var workspace = $('<div>').addClass('Workspace');
    //    var arrayContainer = $('<div>').addClass('ArrayItemsContainer');
    //    var container = $('<div>').addClass('ItemContainer');

    //    var itemWidth = Math.max(Math.floor(container.innerWidth() / array.length) - 10, 30);

    //    for (var i = 0; i < size; ++i) {
    //        var newArrayItem = $('<div>').addClass("item").height(30).width(itemWidth).css("flex-basis", itemWidth).text("a[" + i + "]");
    //        arrayContainer.append(newArrayItem);
    //        var itemHeight = 50;
    //        if (this.displayType != this.Enums.DisplayMode.Blackbox) {
    //            var divid = 1;
    //            if (array[i] > 10)
    //                divid = 3;
    //            itemHeight = 50 + array[i] * 5 / divid;
    //        }


    //        var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).css("flex-basis", itemWidth).height(itemHeight).text(array[i]);
    //        container.append(newItem);

    //        if (this.displayType == this.Enums.DisplayMode.Blackbox) {
    //            newItem.addClass('blackBoxMode');
    //        }
    //    }
    //    workspace.append(arrayContainer);
    //    workspace.append(container);
    //    mainContainer.append(workspace);
    //};

    initArray = function (arrayLength, inputType, displayType, teacherInput) {
        var arrayToSort = [];
        var mult = Math.pow(10, 1);
        Math.floor(Math.random() * 100);
        if (inputType == 0) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = Math.floor(Math.random() * mult);
            }
            arrayToSort = arrayToSort.sort(cmpAsc);
        }
        else if (inputType == 2) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = Math.floor(Math.random() * mult);
            }
            arrayToSort = arrayToSort.sort(cmpDesc);
        }
        else if (inputType == 1) {
            for (var i = 0; i < arrayLength; i++) {
                arrayToSort[i] = Math.floor(Math.random() * mult);
            }
        }
        else if (inputType == 3) {
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

        var itemWidth = Math.min(Math.floor(container.innerWidth() / arrayToSort.length) - 10, 30);

        for (var i = 0; i < arrayToSort.length; i++) {
            var itemHeight = 0;
            if (displayType == 1) {
                itemHeight = 50;
            }
            else {
                var divid = 1;
                if (arrayToSort[i] > 10)
                    divid = 3;
                itemHeight = 50 + arrayToSort[i] * 5 / divid;
            }

            var newArrayItem = $('<div>').addClass("item").height(30).width(itemWidth).text("a[" + i + "]");
            arrayContainer.append(newArrayItem);

            var newItem = $('<div>').attr('id', 'a' + i).addClass("item").width(itemWidth).height(itemHeight).text(arrayToSort[i]);
            if (displayType == 1) {
                newItem.addClass("blackBoxMode");
            }
            container.append(newItem);
        }

        return arrayToSort;
    };

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

    $(document).on("click", ".card_text.hiddenGradient", function () {
        $(this).removeClass("hiddenGradient");
        $(this).addClass("shownGradient");
    });

    $(document).on("click", ".card_text.shownGradient", function () {
        $(this).addClass("hiddenGradient");
        $(this).removeClass("shownGradient");
    });
    /*
    $("#CheckVideoModal").on('show.bs.modal', function (e) {
        var dataUrl = "";
        dataUrl = $(this).data('url');//$('#UrlChanged').attr('xmlvalue');
        //dataUrl = getId(dataUrl);
        var convertedUrl = "https://www.youtube.com/embed/" + dataUrl.toString();
        //alert(convertedUrl);
        $('#player').attr("src", dataUrl);//convertedUrl);
            
    }); */
    
})(jQuery);