'use strict';
(function ($, AlgoRythmics) {

    var _super = $.extend({}, AlgoRythmics);
    var playerId = "";
    var connection = new signalR.HubConnectionBuilder().withUrl("/gameHubSingle").build();
    var _this = AlgoRythmics;
    var startTime = new Date();
    var endTime = new Date();

    function cleanUpListener() {
        connection.invoke("renounce", model.matchId, playerId).catch(function (err) {
            return console.error(err.toString());
        });
    }
    

    $(document).ready(function () {
    //AlgoRythmics.startButtonListener = function () {
        //var user = document.getElementById("userInput").value;

        var arrayCount = model.arraySize;
        connection.start().then(function () {
            //document.getElementById("clickButton").disabled = true;
            //document.getElementById("startButton").disabled = false;
            connection.invoke("waiting", arrayCount, _this.algorithmType, model.matchId, model.authenticatedUserID).catch(function (err) {
                return console.error(err.toString());
            });
        }).catch(function (err) {
            return console.error(err.toString());
            });

        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            return "Are you sure you want to exit?";
        });

        window.addEventListener('unload', cleanUpListener);

        
      //  event.preventDefault();
    });



    //Disable send button until connection is established
    //document.getElementById("clickButton").disabled = true;
    //document.getElementById("startButton").disabled = false;
    connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));


    connection.on("getReady", function (newId, gameId, arrayToSort, valueToSearchFor) {
        //counter = 0;
        playerId = newId;
        //document.getElementById("player1Name").innerHTML = player1;
        //document.getElementById("player2Name").innerHTML = player2;
        if (model.inputType != _this.Enums.InputType.TeacherInput) {
            _this.teacherInput = arrayToSort;
            _this.inputType = 3;
            if (model.algorithmType == "Searching") {
                _this.searchTarget = valueToSearchFor;
            }
        }
        startTime = new Date();
        
        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = now - startTime.getTime();

            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $(".inputs").first().text(hours + "h " + minutes + "m " + seconds + "s ");
            
        }, 1000);

        _super.startButtonListener.call(_this);
    });

    connection.on("winner", function (message) {
        /*if (!alert(message)) {
            window.location.href = '../Home/Index';
        }*/
        
        //document.getElementById("clickButton").disabled = true;
        //document.getElementById("startButton").disabled = false;
        //document.getElementById("player1Name").innerHTML = "";
        //document.getElementById("player2Name").innerHTML = "";
        window.removeEventListener('unload', cleanUpListener);
        $('#congratulationsMessage').text(message);
        $('#congratulations').modal('show');
    });

    AlgoRythmics.finishAlgorithm = function () {
        //var user = document.getElementById("userInput").value;
        endTime = new Date();
        var hours = parseInt(Math.abs(endTime - startTime) / (1000 * 60 * 60) % 24).toString();
        var minutes = parseInt(Math.abs(endTime.getTime() - startTime.getTime()) / (1000 * 60) % 60).toString();
        var seconds = parseInt(Math.abs(endTime.getTime() - startTime.getTime()) / (1000) % 60).toString();
        if (minutes.length == 1)
            minutes = "0" + minutes;
        if (seconds.length == 1)
            seconds = "0" + seconds;
        var timespan = hours + ":" + minutes + ":" + seconds;

        connection.invoke("finished", playerId, model.matchId, timespan).catch(function (err) {
            return console.error(err.toString());
        });
        _super.finishAlgorithm.call(this);
        //window.location.href = '../Home/Index';
    };

    $('#congratulations').on('hidden.bs.modal', function () {
        window.location.href = '/Home/Index';
    });
       

})(jQuery, window.AlgoRythmics);