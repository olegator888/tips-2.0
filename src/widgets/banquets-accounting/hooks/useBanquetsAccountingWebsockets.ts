import { useEffect } from "react";
import { useBanquetsAccountingStore } from "../storage";
import { socket } from "@/shared/websockets";
import { BanquetsWebsocketEvent } from "../model";

export const useBanquetsAccountingWebsockets = () => {
  const { addBanquet, updateBanquet, removeBanquet, removeAllBanquets } =
    useBanquetsAccountingStore();

  useEffect(() => {
    socket.on(BanquetsWebsocketEvent.CREATE_BANQUET, addBanquet);
    socket.on(BanquetsWebsocketEvent.UPDATE_BANQUET, updateBanquet);
    socket.on(BanquetsWebsocketEvent.REMOVE_BANQUET, removeBanquet);
    socket.on(BanquetsWebsocketEvent.REMOVE_ALL_BANQUETS, removeAllBanquets);
  }, [addBanquet, updateBanquet, removeBanquet, removeAllBanquets]);
};
