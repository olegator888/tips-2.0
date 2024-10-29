import { WebsocketEvent } from "@/shared/model/websockets";
import { socket } from "@/shared/websockets";
import { useEffect } from "react";
import { useRoomStore } from "../storage";

export const useWebsocketRooms = () => {
  const { setParticipants } = useRoomStore();

  useEffect(() => {
    socket.on(WebsocketEvent.ROOM_INFO, ({ participants }) => {
      setParticipants(participants || []);
    });
  }, []);
};
