"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/clickerHub").build();

//Disable send button until connection is established
document.getElementById("clickButton").disabled = true;
document.getElementById("startButton").disabled = false;

var counter = 0;

connection.on("standBy", function () {
    document.getElementById("startButton").disabled = true;
    document.getElementById("clickButton").disabled = true;
});

connection.on("getReady", function (player1, player2) {
    counter = 0;
    document.getElementById("player1Name").innerHTML =player1;
    document.getElementById("player2Name").innerHTML =player2;
    document.getElementById("clickButton").disabled = false;
    document.getElementById("startButton").disabled = true;
});

connection.on("winner", function (user) {
    alert("User: " + user + " is victorious!");
    document.getElementById("clickButton").disabled = true;
    document.getElementById("startButton").disabled = false;
    document.getElementById("player1Name").innerHTML ="";
    document.getElementById("player2Name").innerHTML ="";
});



document.getElementById("clickButton").addEventListener("click", function (event) {
    counter = counter + 1;
    if (counter == 10) {
        var user = document.getElementById("userInput").value;
        connection.invoke("finished", user).catch(function (err) {
            return console.error(err.toString());
        });
    }
    event.preventDefault();
});

document.getElementById("startButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    connection.start().then(function () {
        document.getElementById("clickButton").disabled = true;
        document.getElementById("startButton").disabled = false;
    }).catch(function (err) {
        return console.error(err.toString());
    });
    connection.invoke("waiting", user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});