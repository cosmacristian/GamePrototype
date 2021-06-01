(function ($) {

    window.AlgoRythmics = window.AlgoRythmics || {};

    window.AlgoRythmics.saveStatistics = function (eventType, params, callback) {
        var postData = {
            // TODO: define the correct POST parameters:
            eventType: eventType,
        };

        $.post(window.AlgoRythmics.StatisticsUrl, postData)
            .done(function () {
                if (callback) {
                    callback();
                }
            });
    }


   

})(jQuery);