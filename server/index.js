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

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomID, emailID } = data;
    console.log(`User with email ${emailID} joined room ${roomID}`);
    emailToScoketMapping.set(emailID, socket.id);
    socket.join(roomID);
    socket.broadcast.to(roomID).emit("user-joined", { emailID });
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