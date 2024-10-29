import { IBanquetAccounting } from "@/entities/banquet";
import { v4 } from "uuid";
import { create } from "zustand";

interface State {
  banquets: IBanquetAccounting[];
  kitchen: number;
  bar: number;
}

interface Actions {
  addBanquet: (payload: IBanquetAccounting) => void;
  removeBanquet: (id: string) => void;
  removeAllBanquets: () => void;
  updateBanquet: (payload: Partial<IBanquetAccounting>) => void;
  setKitchen: (value: number) => void;
  setBar: (value: number) => void;
}

export const useBanquetsAccountingStore = create<State & Actions>((set) => ({
  banquets: [{ id: "first banquet id", order: 0, preorder: 0 }],
  kitchen: 0,
  bar: 0,

  addBanquet: (payload: IBanquetAccounting) =>
    set((state) => ({
      banquets: [...state.banquets, payload],
    })),
  removeBanquet: (id: string) =>
    set((state) => ({
      banquets: state.banquets.filter((banquet) => banquet.id !== id),
    })),
  removeAllBanquets: () =>
    set({ banquets: [{ id: v4(), order: 0, preorder: 0 }] }),
  updateBanquet: (payload: Partial<IBanquetAccounting>) =>
    set((state) => ({
      banquets: state.banquets.map((banquet) =>
        banquet.id === payload.id ? { ...banquet, ...payload } : banquet
      ),
    })),
  setKitchen: (value: number) => set({ kitchen: value }),
  setBar: (value: number) => set({ bar: value }),
}));
