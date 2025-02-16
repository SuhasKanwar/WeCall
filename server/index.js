const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const io = new Server({
  cors: true,
});

// Middlewares
const { logger } = require("./middlewares/logger");
app.use(cors());
app.use(logger("logs.txt"));
app.use(bodyParser.json());

const emailToScoketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomID, emailID } = data;
    console.log(`User with email ${emailID} joined room ${roomID}`);
    emailToScoketMapping.set(emailID, socket.id);
    socketToEmailMapping.set(socket.id, emailID);
    socket.join(roomID);
    socket.emit("joined-room", { roomID });
    socket.broadcast.to(roomID).emit("user-joined", { emailID });
  });

  socket.on("call-user", (data) => {
    const { emailID, offer } = data;
    const fromEmail = socketToEmailMapping.get(socket.id);
    const socketID = emailToScoketMapping.get(emailID);
    socket.to(socketID).emit("incoming-call", { from: fromEmail, offer });
  });

  socket.on("call-accepted", (data) => {
    const { emailID, ans } = data;
    const socketID = emailToScoketMapping.get(emailID);
    socket.to(socketID).emit("call-accepted", { ans });
  });
});

app.get("/", (req, res) => {
  return res.end("WeCall server has started successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`\n\nhttp://localhost:${PORT}\n\n`);
});

io.listen(9001);