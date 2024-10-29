import { create } from "zustand";

interface State {
  userName: string;
}

interface Actions {
  setUserName: (userName: string) => void;
}

export const useUserDataStore = create<State & Actions>((set) => ({
  userName: "",

  setUserName: (userName) => set({ userName }),
}));
