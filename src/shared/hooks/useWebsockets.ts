import { socket } from "@/shared/websockets";
import { useWebsocketsStore } from "@/shared/storage/websockets";
import { useEffect } from "react";

export const useWebsockets = () => {
  const { setConnected } = useWebsocketsStore();

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    return () => {
      socket.disconnect();
      setConnected(false);
    };
  }, []);
};
