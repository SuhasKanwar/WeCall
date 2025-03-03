import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props: { children: React.ReactNode }) => {
  const socket = useMemo(() => io("localhost:9001"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};