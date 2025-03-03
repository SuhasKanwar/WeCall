import { useState, useCallback, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

interface RoomJoinData {
  email: string;
  room: string;
}

const Lobby = () => {
  const [email, setEmail] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (socket && email && room) {
        socket.emit("room:join", { email, room });
      }
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data: RoomJoinData) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (socket) {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }
  }, [socket, handleJoinRoom]);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Lobby;