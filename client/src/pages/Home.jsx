import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/Socket";

const Home = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [roomID, setRoomID] = useState("");

  const handleRoomJoined = useCallback(({ roomID }) => {
    navigate(`/room/${roomID}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('joined-room', handleRoomJoined);
  }, [handleRoomJoined, socket]);

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