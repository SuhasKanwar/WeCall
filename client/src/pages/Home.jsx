import React, { useState, useEffect } from "react";
import { useSocket } from "../providers/Socket";

const Home = () => {
  const socket = useSocket();

  const [email, setEmail] = useState("");
  const [roomID, setRoomID] = useState("");

  const handleRoomJoined = ({ roomID }) => {
    console.log(`Joined room ${roomID}`);
  }

  useEffect(() => {
    socket.on('joined-room', handleRoomJoined);
  }, [socket]);

  const handleJoinRoom = () => {
    socket.emit("join-room", { emailID: email, roomID });
  };

  return (
    <div className="container">
      <div>
        <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="text" placeholder="Enter your room code" value={roomID} onChange={e => setRoomID(e.target.value)} />
        <button onClick={handleJoinRoom}>Enter Room</button>
      </div>
    </div>
  );
};

export default Home;