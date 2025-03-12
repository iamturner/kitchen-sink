import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";

// SOCKET_URL can be undefined in production builds
const SOCKET_URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

const SocketContext = createContext({ isConnected: false, socket: null });

const SocketProvider = ({ children }: React.PropsWithChildren) => {
  // connected status saved in state
  const [isConnected, setIsConnected] = useState(false);

  // create new socket ref
  const socket = useRef(io(SOCKET_URL, { autoConnect: false }));

  useEffect(() => {
    socket.current.on("connect", () => setIsConnected(true));
    socket.current.on("disconnect", () => setIsConnected(false));
    // manually connect after listeners are registered
    socket.current.connect();

    return () => {
      socket.current.off("connect");
      socket.current.off("disconnect");
      // manually disconnect
      socket.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected, socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
