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

io.on("connection", function (socket) {
    console.log("connection made with id: " + socket.id);

    socket.on("disconnect", function () {
        console.log(socket.id + " has discconected");
    });
});