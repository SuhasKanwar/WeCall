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
      console.log("handleNewUserJoined called with:", data);
      if (peer.signalingState !== "stable") return;
      const { emailID } = data;
      const offer = await createOffer();
      socket.emit("call-user", { emailID, offer });
      setRemoteEmailID(emailID);
    },
    [createOffer, peer.signalingState, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      console.log("handleIncomingCall fired:", data);
      const { from, offer } = data;
      // Roll back any local offer if needed:
      if (peer.signalingState === "have-local-offer") {
        console.warn("Rolling back local offer before applying remote offer.");
        await peer.setLocalDescription({ type: "rollback" });
      }
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailID: from, ans });
      setRemoteEmailID(from);
    },
    [createAnswer, peer.signalingState, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      console.log("handleCallAccepted:", data);
      // Only set remote answer if we have a local offer
      if (peer.signalingState !== "have-local-offer") {
        console.warn("Skipping remote answer because we're not in have-local-offer state.");
        return;
      }
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
    console.log("handleNegotiation triggered");
    if (!peer.localDescription) {
      console.warn("Local description is null, skipping call-user.");
      return;
    }
    socket.emit("call-user", { emailID: remoteEmailID, offer: peer.localDescription });
  }, [peer.localDescription, remoteEmailID, socket]);

  useEffect(() => {
    console.log("Room mounted, peer signalingState:", peer.signalingState);
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
    peer.addEventListener("negotiationneeded", handleNegotiation);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiation);
    };
  }, [peer, handleNegotiation]);

  useEffect(() => {
    async function initStream() {
      await getUserMediaStream();
    }
    initStream();
  }, [getUserMediaStream]);

  useEffect(() => {
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          toEmail: remoteEmailID,
          candidate: event.candidate,
        });
      }
    };
    socket.on("ice-candidate", ({ candidate }) => {
      peer.addIceCandidate(candidate);
    });
    return () => {
      peer.onicecandidate = null;
      socket.off("ice-candidate");
    };
  }, [peer, remoteEmailID, socket]);

  useEffect(() => {
    const onSignalingChange = () => {
      console.log("Signaling State:", peer.signalingState);
    };
    peer.addEventListener("signalingstatechange", onSignalingChange);
    return () => {
      peer.removeEventListener("signalingstatechange", onSignalingChange);
    };
  }, [peer]);

  return (
    <div>
      <h1>Room Page</h1>
      <p>You are connected to: {remoteEmailID}</p>
      <button onClick={(e) => sendStream(myStream)}>Start Video</button>
      <h1>My Stream</h1>
      <ReactPlayer url={myStream} playing />
      <h1>Remote Stream</h1>
      <ReactPlayer url={remoteStream} playing />
    </div>
  );
};

export default Room;
