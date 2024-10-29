import { useEffect } from "react";
import { useBanquetsAccountingStore } from "../storage";
import { socket } from "@/shared/websockets";
import { BanquetsWebsocketEvent } from "../model";

export const useBanquetsAccountingWebsockets = () => {
  const {
    banquets,
    addBanquet,
    updateBanquet,
    removeBanquet,
    removeAllBanquets,
    setBanquets,
  } = useBanquetsAccountingStore();

  useEffect(() => {
    socket.on(BanquetsWebsocketEvent.SEND_BANQUETS_DATA, setBanquets);
    socket.on(BanquetsWebsocketEvent.CREATE_BANQUET, addBanquet);
    socket.on(BanquetsWebsocketEvent.UPDATE_BANQUET, updateBanquet);
    socket.on(BanquetsWebsocketEvent.REMOVE_BANQUET, removeBanquet);
    socket.on(BanquetsWebsocketEvent.REMOVE_ALL_BANQUETS, removeAllBanquets);

    return () => {
      socket.off(BanquetsWebsocketEvent.SEND_BANQUETS_DATA, setBanquets);
      socket.off(BanquetsWebsocketEvent.CREATE_BANQUET, addBanquet);
      socket.off(BanquetsWebsocketEvent.UPDATE_BANQUET, updateBanquet);
      socket.off(BanquetsWebsocketEvent.REMOVE_BANQUET, removeBanquet);
      socket.off(BanquetsWebsocketEvent.REMOVE_ALL_BANQUETS, removeAllBanquets);
    };
  }, []);

  // Initial data request
  useEffect(() => {
    const handler = () => {
      socket.emit(BanquetsWebsocketEvent.SEND_BANQUETS_DATA, banquets);
    };

    socket.on(BanquetsWebsocketEvent.REQUEST_BANQUETS_DATA, handler);

    return () => {
      socket.on(BanquetsWebsocketEvent.REQUEST_BANQUETS_DATA, handler);
    };
  }, [banquets]);
};
