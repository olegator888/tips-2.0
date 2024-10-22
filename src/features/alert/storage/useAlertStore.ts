import { create } from "zustand";

export interface AlertStore {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  subtitle?: string;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  onConfirm: () => set({ isOpen: false }),
}));
