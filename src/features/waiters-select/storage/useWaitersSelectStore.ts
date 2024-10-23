import { create } from "zustand";
import { IWaiter } from "@/entities/waiter";

type ID = IWaiter["id"];

interface State {
  isOpen: boolean;
  selectedWaiters: Set<ID>;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  unselectAll: () => void;
  setSelectedWaiters: (selectedWaiters: Set<ID>) => void;
}

export const useWaitersSelectStore = create<State & Actions>((set) => ({
  isOpen: false,
  selectedWaiters: new Set(),
  setIsOpen: (isOpen) => set({ isOpen }),
  unselectAll: () => set({ selectedWaiters: new Set() }),
  setSelectedWaiters: (selectedWaiters) => set({ selectedWaiters }),
}));
