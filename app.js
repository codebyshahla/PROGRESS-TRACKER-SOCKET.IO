const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = 3000;
const cors = require("cors");
const secretKey = process.env.JWT_TOKEN;

app.use(cors());
app.use(express.json());

let connectedUsers = [];

io.on("connection", (socket) => {
  console.log("A user connected successfully");

  socket.on("userConnection", ({ token }) => {
    const adminEmail = jwt.verify(token, secretKey).email;
    connectedUsers[adminEmail] = socket.id;
    console.log(adminEmail, "adminEmail");
    console.log(connectedUsers, "arrayyy ");
    socket.on("message", ({ recieverEmail, message }) => {
      const recieverId = connectedUsers[recieverEmail];
      console.log(recieverId, "reciever  id ");
      console.log(message, "message");
      if (recieverId) {
        io.to(recieverId).emit("recieverMessage", {
          message,
          recieverEmail,
          senderEmail: adminEmail,
        });
        console.log(`${message} to ${recieverEmail}`);
      } else {
        console.log(` resiptiont ${recieverEmail} not found`);
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
