const express = require("express"); 
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

app.use(express.static(path.join(__dirname + "/public")));
server.listen(process.env.PORT || 5000, '0.0.0.0');
console.log("Server running on localhost:5000");

let players = {};
let numConnections = 0;
let gameStarted = false;

io.on("connection", function (socket) {
    console.log("connection made with id: " + socket.id);
    if(numConnections < 2) {
        players[socket.id] = {
            score: 0,
            toiletOverflow: 0,
        };
        numConnections++;

        if(numConnections === 2) {
            let playerIds = Object.keys(players);
            io.sockets.to(playerIds[0]).emit("gameStart");
            io.sockets.to(playerIds[1]).emit("gameStart");
        }
    }
    else {
        io.sockets.to(socket.id).emit("gameFull");
    }

    socket.on("disconnect", function () {
        console.log(socket.id + " has disconected");
        if(Object.keys(players).includes(socket.id)) {
            delete players[socket.id];
            numConnections--;
        }
    });

    socket.on("scoreUpdate", function(data) {
        players[socket.id] = data;

        let playerIds = Object.keys(players);

        if(playerIds[0] === socket.id) {
            io.sockets.to(socket.id).emit("updateEnemy", players[playerIds[1]]);
        }
        else {
            io.sockets.to(socket.id).emit("updateEnemy", players[playerIds[0]]);
        }
    });

    socket.on("endGame", function() {
        let playerIds = Object.keys(players);

        io.sockets.to(playerIds[0]).emit("updateEnemy", players[playerIds[1]]);
        io.sockets.to(playerIds[1]).emit("updateEnemy", players[playerIds[0]]);

        io.sockets.emit("gameOver");
    });
});