import { IWaiter } from "@/entities/waiter";
import { create } from "zustand";

interface State {
  waitersList: IWaiter[];
}

interface Actions {
  addWaiter: (waiter: IWaiter) => void;
  removeWaiter: (waiterId: IWaiter["id"]) => void;
}

const mockWaiters: IWaiter[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: String(i),
    name: `waiter name ${i}`,
  }));

export const useWaitersListStore = create<State & Actions>((set) => ({
  waitersList: mockWaiters,

  addWaiter: (waiter) =>
    set((prev) => ({
      waitersList: [...prev.waitersList, waiter],
    })),
  removeWaiter: (waiterId) =>
    set((prev) => ({
      waitersList: prev.waitersList.filter((waiter) => waiter.id !== waiterId),
    })),
}));
