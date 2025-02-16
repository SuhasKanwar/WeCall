import React, { useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocket = () => {
  return React.useContext(SocketContext);
};

const socketURI = process.env.NODE_ENV === "production" ? process.env.PRODUCTION_SOCKET_URI : process.env.DEVELOPMENT_SOCKET_URI;

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(socketURI), []);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};