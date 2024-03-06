require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;


io.on("connection", (socket) => {
  console.log("A user connected  successfully");
});

server.listen(port,()=>{
    console.log('socket server is now running successfully')
})