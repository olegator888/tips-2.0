import { create } from "zustand";

interface State {
  currentRoom: string | null;
  participants: string[];
}

interface Actions {
  setCurrentRoom: (currentRoom: string | null) => void;
  setParticipants: (participants: string[]) => void;
}

export const useRoomStore = create<State & Actions>((set) => ({
  currentRoom: null,
  participants: [],

  setCurrentRoom: (currentRoom: string | null) => set({ currentRoom }),
  setParticipants: (participants: string[]) => set({ participants }),
}));
