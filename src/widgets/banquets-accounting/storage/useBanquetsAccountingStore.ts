import { IBanquetAccounting } from "@/entities/banquet";
import { v4 } from "uuid";
import { create } from "zustand";

interface State {
  banquets: IBanquetAccounting[];
}

interface Actions {
  addBanquet: () => void;
  removeBanquet: (id: string) => void;
  updateBanquet: (payload: Partial<IBanquetAccounting>) => void;
}

export const useBanquetsAccountingStore = create<State & Actions>((set) => ({
  banquets: [],

  addBanquet: () =>
    set((state) => ({
      banquets: [...state.banquets, { id: v4(), order: 0, preorder: 0 }],
    })),
  removeBanquet: (id: string) =>
    set((state) => ({
      banquets: state.banquets.filter((banquet) => banquet.id !== id),
    })),
  updateBanquet: (payload: Partial<IBanquetAccounting>) =>
    set((state) => ({
      banquets: state.banquets.map((banquet) =>
        banquet.id === payload.id ? { ...banquet, ...payload } : banquet
      ),
    })),
}));
