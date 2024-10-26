import { create } from "zustand";
import { IWaiter } from "@/entities/waiter";

type ID = IWaiter["id"];

interface State {
  isOpen: boolean;
  selectedWaiters: Set<ID>;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  setSelectedWaiters: (selectedWaiters: Set<ID>) => void;
}

export const useWaitersSelectStore = create<State & Actions>((set) => ({
  isOpen: false,
  selectedWaiters: new Set(),
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedWaiters: (selectedWaiters) => set({ selectedWaiters }),
}));
