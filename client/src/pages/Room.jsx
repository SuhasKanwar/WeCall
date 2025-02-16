import React, { useEffect, useCallback } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  const socket = useSocket();
  const { peer, createOffer } = usePeer();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailID } = data;
      const offer = await createOffer();
      socket.emit("call-user", { emailID, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(async (data) => {
    const { from, offer } = data;
    console.log(`Incoming call from ${from} with offer ${offer}`);
  });

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
  }, [handleNewUserJoined, handleIncomingCall, socket]);

  return (
    <div>
      <h1>Room Page</h1>
    </div>
  );
};

export default Room;