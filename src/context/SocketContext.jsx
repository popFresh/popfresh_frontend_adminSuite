import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { socket } from "../socket/socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (!isAuthenticated) {
      socket.disconnect();
      return;
    }

    // Attach JWT before connecting
    socket.auth = {
      token: localStorage.getItem("token"),
    };

    socket.connect();
    socket.on("connect_error", (err) => {
  console.error("❌ Socket Connect Error:", err.message);
});

    const handleConnect = () => {
      console.log("🟢 Socket Connected:", socket.id);
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🔴 Socket Disconnected");
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);