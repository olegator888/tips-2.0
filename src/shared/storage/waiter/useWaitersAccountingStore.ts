import { IWaiter } from "@/entities/waiter";
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
