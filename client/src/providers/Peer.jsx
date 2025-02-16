import React, { useCallback, useEffect, useMemo, useState } from 'react'

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
    const [remoteStream, setRemoteStream] = useState(null);

    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
                ]
            }
        ]
    }), []);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    }

    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(answer);
    }

    const sendStream = async (stream) => {
        if (!stream) {
            console.error("No stream provided for sendStream");
            return;
        }
        const existingSenders = peer.getSenders();
        const existingTracks = existingSenders.map(sender => sender.track);
        const tracks = stream.getTracks();
        for (const track of tracks) {
            if (!existingTracks.includes(track)) {
                peer.addTrack(track, stream);
            }
        }
    }

    const handleTrackEvent = useCallback((e) => {
        const streams = e.streams;
        setRemoteStream(streams[0]);
    }, []);

    useEffect(() => {
        peer.addEventListener('track', handleTrackEvent);
        return () => {
            peer.removeEventListener('track', handleTrackEvent);
        }
    }, [handleTrackEvent, peer]);

  return (
    <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream }}>
      {props.children}
    </PeerContext.Provider>
  )
}