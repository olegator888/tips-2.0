import { WebsocketEvent } from "@/shared/model/websockets";
import { socket } from "@/shared/websockets";
import { useEffect } from "react";
import { useRoomStore } from "../storage";

export const useWebsocketRoom = () => {
  const { setParticipants, toggleBanquetEditing } = useRoomStore();

  useEffect(() => {
    socket.on(WebsocketEvent.ROOM_INFO, ({ participants }) => {
      setParticipants(participants || []);
    });
    socket.on(WebsocketEvent.INPUT_FOCUS_CHANGE, toggleBanquetEditing);
  }, []);
};
