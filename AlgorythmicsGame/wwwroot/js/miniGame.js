'use strict';
(function ($, AlgoRythmics) {

    var _super = $.extend({}, AlgoRythmics);
    var playerId = "";
    var matchId = 0;
    var connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();
    var _this = AlgoRythmics;
    AlgoRythmics.startButtonListener = function () {
        //var user = document.getElementById("userInput").value;
        connection.start().then(function () {
            //document.getElementById("clickButton").disabled = true;
            //document.getElementById("startButton").disabled = false;
            connection.invoke("waiting").catch(function (err) {
                return console.error(err.toString());
            });
        }).catch(function (err) {
            return console.error(err.toString());
        });
        
        event.preventDefault();
    };

    //Disable send button until connection is established
    //document.getElementById("clickButton").disabled = true;
    //document.getElementById("startButton").disabled = false;
    connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));

    connection.on("standBy", function () {
        alert("Please wait");
        //document.getElementById("startButton").disabled = true;
        //document.getElementById("clickButton").disabled = true;
    });

    connection.on("getReady", function (newId, gameId) {
        //counter = 0;
        playerId = newId;
        matchId = gameId;
        //document.getElementById("player1Name").innerHTML = player1;
        //document.getElementById("player2Name").innerHTML = player2;
        _super.startButtonListener.call(_this);
    });

    connection.on("winner", function (message) {
        if (!alert(message)) {
            window.location.href = '../Home/Index';
        }
        
        //document.getElementById("clickButton").disabled = true;
        //document.getElementById("startButton").disabled = false;
        //document.getElementById("player1Name").innerHTML = "";
        //document.getElementById("player2Name").innerHTML = "";
        //$('#congratulations').modal('show');
    });

    AlgoRythmics.finishAlgorithm = function () {
        //var user = document.getElementById("userInput").value;
        connection.invoke("finished", playerId, matchId).catch(function (err) {
            return console.error(err.toString());
        });
        _super.finishAlgorithm.call(this);
        window.location.href = '../Home/Index';
    };
       

})(jQuery, window.AlgoRythmics);