import React, { useEffect, useCallback } from "react";
import { SocketProvider, useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  const socket = useSocket();
  const { peer, createOffer, createAnswer, setRemoteAnswer } = usePeer();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailID } = data;
      const offer = await createOffer();
      socket.emit("call-user", { emailID, offer });
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
    console.log("Incoming call from", from, "with offer", offer);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailID: from, ans });
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      await setRemoteAnswer(ans);
      console.log("Call accepted", ans);
    },
    [setRemoteAnswer, socket]
  );

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted, socket]);

  return (
    <div>
      <h1>Room Page</h1>
    </div>
  );
};

export default Room;