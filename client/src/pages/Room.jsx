import React, { useEffect } from "react";
import { useSocket } from "../providers/Socket";

const Room = () => {
  const socket = useSocket();

  const handleUserJoined = (data) => {
    const { emailID } = data;
    console.log(`User with email ${emailID} joined the room`);
  };

  useEffect(() => {
    socket.on('user-joined', handleUserJoined);
  }, []);

  return (
    <div>
      <h1>Room Page</h1>
    </div>
  );
};

export default Room;
