import { IWaiter } from "@/entities/waiter";
import { loadMapFromLocalStorage, saveMapToLocalStorage } from "@/shared/lib";
import { useEffect } from "react";
import { create } from "zustand";

interface State {
  cashTips: number;
  hours: Map<IWaiter["id"], number>;
  cards: Map<IWaiter["id"], number>;
  earnings: Map<IWaiter["id"], number>;
}

interface Actions {
  setCashTips: (cashTips: number) => void;
  setHours: (hours: Map<IWaiter["id"], number>) => void;
  setCards: (cards: Map<IWaiter["id"], number>) => void;
  setEarnings: (earnings: Map<IWaiter["id"], number>) => void;
}

export const useWaitersAccountingStore = create<State & Actions>((set) => ({
  cashTips: 0,
  hours: new Map(),
  cards: new Map(),
  earnings: new Map(),
  setCashTips: (cashTips) => set({ cashTips }),
  setHours: (hours) => set({ hours }),
  setCards: (cards) => set({ cards }),
  setEarnings: (earnings) => set({ earnings }),
}));

export const useWaitersAccountingLS = () => {
  const {
    cashTips,
    hours,
    cards,
    earnings,
    setCashTips,
    setHours,
    setCards,
    setEarnings,
  } = useWaitersAccountingStore();

  useEffect(() => {
    setCashTips(Number(JSON.parse(localStorage.getItem("cashTips") || "0")));
    setHours(loadMapFromLocalStorage("hours"));
    setCards(loadMapFromLocalStorage("cards"));
    setEarnings(loadMapFromLocalStorage("earnings"));
  }, []);

  useEffect(() => {
    localStorage.setItem("cashTips", JSON.stringify(cashTips));
  }, [cashTips]);

  useEffect(() => {
    saveMapToLocalStorage("hours", hours);
  }, [hours]);

  useEffect(() => {
    saveMapToLocalStorage("cards", cards);
  }, [cards]);

  useEffect(() => {
    saveMapToLocalStorage("earnings", earnings);
  }, [earnings]);
};
