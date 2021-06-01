(function ($) {

    window.Utilities = {};

    window.Utilities.initOperationLog = function () {
        $('#listOfMovements').text('');
    };

    window.Utilities.logOperation = function (operation, type) {
        $('#CurrentMovement').text(operation);
        var iconType = "";
        switch (type) {
            case 0:
                iconType = "glyphicon glyphicon-map-marker";
                break;
            case 1:
                iconType = "glyphicon glyphicon-scale";
                break;
            case 2:
                iconType = "glyphicon glyphicon-transfer";
                break;
        }
        var listOfOperations = $('#listOfMovements');
        listOfOperations.append('<span id="filterIcon" class="'+ iconType + '">  </span>' + operation + '<br />');

        if (listOfOperations.length > 0) {
            listOfOperations[0].scrollTop = listOfOperations[0].scrollHeight;
        }
    };

    window.Utilities.logOperationSeparator = function () {
        $('#listOfMovements').append('<hr />');
    };

})(jQuery);