'use strict';
(function ($, AlgoRythmics) {

    var _super = $.extend({}, AlgoRythmics);
    var playerId = 0;
    var connection = new signalR.HubConnectionBuilder().withUrl("/gameHub").build();
    var _this = AlgoRythmics;
    AlgoRythmics.startButtonListener = function () {
        //var user = document.getElementById("userInput").value;
        connection.start().then(function () {
            //document.getElementById("clickButton").disabled = true;
            //document.getElementById("startButton").disabled = false;
            connection.invoke("waiting", playerId).catch(function (err) {
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
    

    connection.on("standBy", function () {
        alert("Please wait");
        //document.getElementById("startButton").disabled = true;
        //document.getElementById("clickButton").disabled = true;
    });

    connection.on("getReady", function (newId) {
        //counter = 0;
        playerId = newId;
        //document.getElementById("player1Name").innerHTML = player1;
        //document.getElementById("player2Name").innerHTML = player2;
        _super.startButtonListener.call(_this);
    });

    connection.on("winner", function (message) {
        alert(message);
        //document.getElementById("clickButton").disabled = true;
        //document.getElementById("startButton").disabled = false;
        //document.getElementById("player1Name").innerHTML = "";
        //document.getElementById("player2Name").innerHTML = "";
        //$('#congratulations').modal('show');
    });

    AlgoRythmics.finishAlgorithm = function () {
        //var user = document.getElementById("userInput").value;
        connection.invoke("finished", playerId).catch(function (err) {
            return console.error(err.toString());
        });
        _super.finishAlgorithm.call(this);
    };
       

})(jQuery, window.AlgoRythmics);