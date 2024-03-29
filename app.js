const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require('./config/config')()
const port = 3000;
const cors = require("cors");
const secretKey = process.env.JWT_TOKEN;

app.use(cors());
app.use(express.json());

const Commonroutes = require('./router/commonRouter')
app.use('/',Commonroutes)

let connectedUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected successfully");

  socket.on("userConnection", ({ token }) => {
    const adminEmail = jwt.verify(token, secretKey).email;
    connectedUsers[adminEmail] = socket.id;
    socket.on("message", ({ sender, reciever, message }) => {
      const recieverId = connectedUsers[reciever];
      console.log(recieverId, "reciever  id ");
      console.log(message, "message");
      if (recieverId) {
        io.to(recieverId).emit("recieverMessage", {
          message,
          reciever,
          sender,
        });
        console.log(`${message} to ${reciever}`);
      } else {
        console.log(` resiptiont ${reciever} not found`);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log("Socket server is now running successfully");
});
