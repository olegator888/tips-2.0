import { create } from "zustand";

interface State {
  connected: boolean;
}

interface Actions {
  setConnected: (connected: boolean) => void;
}

export const useWebsocketsStore = create<State & Actions>((set) => ({
  connected: false,

  setConnected: (connected) => set({ connected }),
}));
