import express, { Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const io = new Server(9001, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

// Middlewares
import logger from "./middlewares/logger";
app.use(cors());
app.use(logger("logs.txt"));
app.use(express.json());

// Socket.io setup
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("WeCall server has started successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`\n\nhttp://localhost:${PORT}\n\n`);
});