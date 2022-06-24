'use strict';
(function ($, AlgoRythmics) {

    var _super = $.extend({}, AlgoRythmics);
    var playerId = "";
    var connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();
    var _this = AlgoRythmics;

    $(document).ready(function () {
    //AlgoRythmics.startButtonListener = function () {
        //var user = document.getElementById("userInput").value;

        var arrayCount = model.arraySize;
        connection.start().then(function () {
            //document.getElementById("clickButton").disabled = true;
            //document.getElementById("startButton").disabled = false;
            connection.invoke("waiting", arrayCount, model.inputType, model.matchId).catch(function (err) {
                return console.error(err.toString());
            });
        }).catch(function (err) {
            return console.error(err.toString());
        });
        
      //  event.preventDefault();
    });

    //Disable send button until connection is established
    //document.getElementById("clickButton").disabled = true;
    //document.getElementById("startButton").disabled = false;
    connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));


    connection.on("getReady", function (newId, gameId, arrayToSort) {
        //counter = 0;
        playerId = newId;
        //document.getElementById("player1Name").innerHTML = player1;
        //document.getElementById("player2Name").innerHTML = player2;
        if (model.inputType != _this.Enums.InputType.TeacherInput) {
            _this.teacherInput = arrayToSort;
            _this.inputType = 3;
        }
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
        $('#congratulationsMessage').text(message);
        $('#congratulations').modal('show');
    });

    AlgoRythmics.finishAlgorithm = function () {
        //var user = document.getElementById("userInput").value;
        connection.invoke("finished", playerId, model.matchId).catch(function (err) {
            return console.error(err.toString());
        });
        _super.finishAlgorithm.call(this);
        //window.location.href = '../Home/Index';
    };

    $('#congratulations').on('hidden.bs.modal', function () {
        window.location.href = '/Home/Index';
    });
       

})(jQuery, window.AlgoRythmics);