import { WebsocketEvent } from "@/shared/model/websockets";
import { socket } from "@/shared/websockets";
import { useEffect } from "react";
import { useRoomStore } from "../storage";

export const useWebsocketRoom = () => {
  const { setParticipants, toggleBanquetEditing } = useRoomStore();

  useEffect(() => {
    const roomInfoHandler = ({ participants }: { participants: string[] }) => {
      setParticipants(participants || []);
    };

    socket.on(WebsocketEvent.ROOM_INFO, roomInfoHandler);
    socket.on(WebsocketEvent.INPUT_FOCUS_CHANGE, toggleBanquetEditing);

    return () => {
      socket.off(WebsocketEvent.ROOM_INFO, roomInfoHandler);
      socket.off(WebsocketEvent.INPUT_FOCUS_CHANGE, toggleBanquetEditing);
    };
  }, []);
};
