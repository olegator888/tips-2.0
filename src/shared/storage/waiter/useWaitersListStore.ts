import { IWaiter } from "@/entities/waiter";
import { useEffect } from "react";
import { create } from "zustand";

interface State {
  waitersList: IWaiter[];
}

interface Actions {
  setWaitersList: (waitersList: IWaiter[]) => void;
  addWaiter: (waiter: IWaiter) => void;
  removeWaiter: (waiterId: IWaiter["id"]) => void;
  removeAllWaiters: () => void;
}

const mockWaiters: IWaiter[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: String(i),
    name: `waiter name ${i}`,
  }));

export const useWaitersListStore = create<State & Actions>((set) => ({
  waitersList: mockWaiters,

  setWaitersList: (waitersList) => set(() => ({ waitersList })),
  addWaiter: (waiter) =>
    set((prev) => ({
      waitersList: [...prev.waitersList, waiter],
    })),
  removeWaiter: (waiterId) =>
    set((prev) => ({
      waitersList: prev.waitersList.filter((waiter) => waiter.id !== waiterId),
    })),
  removeAllWaiters: () =>
    set(() => ({
      waitersList: [],
    })),
}));

export const useWaitersListLS = () => {
  const { waitersList, setWaitersList } = useWaitersListStore();

  useEffect(() => {
    setWaitersList(JSON.parse(localStorage.getItem("waitersList") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("waitersList", JSON.stringify(waitersList));
  }, [waitersList]);
};
