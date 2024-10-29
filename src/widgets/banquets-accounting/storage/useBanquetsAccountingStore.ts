import { IBanquetAccounting } from "@/entities/banquet";
import { FIRST_BANQUET_ID } from "@/shared/constants";
import { useEffect } from "react";
import { create } from "zustand";

interface State {
  banquets: IBanquetAccounting[];
  kitchen: number;
  bar: number;
}

interface Actions {
  setBanquets: (payload: IBanquetAccounting[]) => void;
  addBanquet: (payload: IBanquetAccounting) => void;
  removeBanquet: (id: string) => void;
  removeAllBanquets: () => void;
  updateBanquet: (payload: Partial<IBanquetAccounting>) => void;
  setKitchen: (value: number) => void;
  setBar: (value: number) => void;
}

const initialBanquets = [{ id: FIRST_BANQUET_ID, order: 0, preorder: 0 }];

export const useBanquetsAccountingStore = create<State & Actions>((set) => ({
  banquets: [...initialBanquets],
  kitchen: 0,
  bar: 0,

  setBanquets: (payload: IBanquetAccounting[]) => set({ banquets: payload }),
  addBanquet: (payload: IBanquetAccounting) =>
    set((state) => {
      if (state.banquets.length === 50) return state;
      return {
        banquets: [...state.banquets, payload],
      };
    }),
  removeBanquet: (id: string) =>
    set((state) => ({
      banquets: state.banquets.filter((banquet) => banquet.id !== id),
    })),
  removeAllBanquets: () => set({ banquets: [...initialBanquets] }),
  updateBanquet: (payload: Partial<IBanquetAccounting>) =>
    set((state) => ({
      banquets: state.banquets.map((banquet) =>
        banquet.id === payload.id ? { ...banquet, ...payload } : banquet
      ),
    })),
  setKitchen: (value: number) => set({ kitchen: value }),
  setBar: (value: number) => set({ bar: value }),
}));

export const useBanquetsAccountingLS = () => {
  const banquets = useBanquetsAccountingStore().banquets;
  const setBanquets = useBanquetsAccountingStore().setBanquets;

  useEffect(() => {
    setBanquets(JSON.parse(localStorage.getItem("banquets") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("banquets", JSON.stringify(banquets));
  }, [banquets]);
};
