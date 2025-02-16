import React from "react";
import { useSocket } from "../providers/Socket";

const Home = () => {
  const socket = useSocket();
  socket.emit("join-room", { roomID: "69", emailID: "suhas.kanwar@gmail.com" });
  const handleJoinRoom = () => {
    // handling code
  };
  return (
    <div className="container">
      <div>
        <input type="email" placeholder="Enter your email" />
        <input type="text" placeholder="Enter your room code" />
        <button>Enter Room</button>
      </div>
    </div>
  );
};

export default Home;