import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { SocketProvider, useSocket } from "../providers/Socket";
import { usePeer } from "../providers/Peer";

const Room = () => {
  const socket = useSocket();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAnswer,
    sendStream,
    remoteStream,
  } = usePeer();

  const [myStream, setMyStream] = useState(null);
  const [remoteEmailID, setRemoteEmailID] = useState();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailID } = data;
      const offer = await createOffer();
      socket.emit("call-user", { emailID, offer });
      setRemoteEmailID(emailID);
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailID: from, ans });
      setRemoteEmailID(from);
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer, socket]
  );

  const getUserMediaStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
    } catch (error) {
      console.error("Error getting media stream:", error);
    }
  }, []);

  const handleNegotiation = useCallback(async () => {
    const localOffer = peer.localDescription;
    socket.emit("call-user", { emailID: remoteEmailID, offer: localOffer });
  }, [peer.localDescription, remoteEmailID, socket]);

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

  useEffect(() => {
    peer.addEventListener("track", handleNegotiation);
    return () => {
      peer.removeEventListener("track", handleNegotiation);
    };
  }, [peer]);

  useEffect(() => {
    async function initStream() {
      await getUserMediaStream();
    }
    initStream();
  }, [getUserMediaStream]);

  return (
    <div>
      <h1>Room Page</h1>
      <p>You are connected to: {remoteEmailID}</p>
      <button onClick={(e) => sendStream(myStream)}>Start Video</button>
      <ReactPlayer url={myStream} playing />
      <ReactPlayer url={remoteStream} playing />
    </div>
  );
};

export default Room;
