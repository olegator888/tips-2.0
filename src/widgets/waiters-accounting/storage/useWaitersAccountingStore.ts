import { IWaiter } from "@/entities/waiter";
import {
  WaiterCardChangeHandler,
  WaiterHoursChangeHandler,
} from "@/shared/model";
import { create } from "zustand";

type ID = IWaiter["id"];

interface State {
  cashTips: number;
  waitersHours: Map<ID, number>;
  waitersCards: Map<ID, number>;
  waitersEarnings: Map<ID, number>;
}

interface Actions {
  setCashTips: (cashTips: number) => void;
  setWaiterHours: WaiterHoursChangeHandler;
  setWaiterCard: WaiterCardChangeHandler;
  setWaitersEarnings: (waitersEarnings: Map<ID, number>) => void;
}

export const useWaitersAccountingStore = create<State & Actions>((set) => ({
  cashTips: 0,
  waitersHours: new Map(),
  waitersCards: new Map(),
  waitersEarnings: new Map(),

  setCashTips: (cashTips) => set({ cashTips }),
  setWaiterHours: (waiterId, hours) =>
    set((prev) => {
      const waitersHours = new Map(prev.waitersHours);
      waitersHours.set(waiterId, hours);
      return { waitersHours };
    }),
  setWaiterCard: (waiterId, hours) =>
    set((prev) => {
      const waitersCards = new Map(prev.waitersCards);
      waitersCards.set(waiterId, hours);
      return { waitersCards };
    }),
  setWaitersEarnings: (waitersEarnings) => set({ waitersEarnings }),
}));
