import { create } from "zustand";
import { IWaiter } from "@/entities/waiter";

type ID = IWaiter["id"];

interface State {
  isOpen: boolean;
  selectedWaiters: Set<ID>;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  toggleWaiterSelected: (waiterId: ID) => void;
  unselectAll: () => void;
}

export const useWaitersSelectStore = create<State & Actions>((set) => ({
  isOpen: false,
  selectedWaiters: new Set(),

  setIsOpen: (isOpen) => set({ isOpen }),
  toggleWaiterSelected: (waiterId) =>
    set((prev) => {
      const selectedWaiters = new Set(prev.selectedWaiters);
      if (selectedWaiters.has(waiterId)) {
        selectedWaiters.delete(waiterId);
      } else {
        selectedWaiters.add(waiterId);
      }
      return { ...prev, selectedWaiters };
    }),
  unselectAll: () => set({ selectedWaiters: new Set() }),
}));
