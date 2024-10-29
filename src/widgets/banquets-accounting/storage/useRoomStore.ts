import { ToggleBanquetEditingProps } from "@/shared/model";
import { create } from "zustand";

interface State {
  currentRoom: string | null;
  participants: string[];
  banquetsEditing: Map<string, Map<string, string>>; // banquetId: { field: userName }
}

interface Actions {
  setCurrentRoom: (currentRoom: string | null) => void;
  setParticipants: (participants: string[]) => void;
  toggleBanquetEditing: (props: ToggleBanquetEditingProps) => void;
}

export const useRoomStore = create<State & Actions>((set) => ({
  currentRoom: null,
  participants: [],
  banquetsEditing: new Map(),

  setCurrentRoom: (currentRoom: string | null) => set({ currentRoom }),
  setParticipants: (participants: string[]) => set({ participants }),
  toggleBanquetEditing: ({ banquetId, field, userName, isEditing }) =>
    set((state) => {
      const newState = new Map(state.banquetsEditing);
      let newBanquet = new Map(newState.get(banquetId) || new Map());

      if (isEditing) {
        newBanquet.set(field, userName);
      } else {
        newBanquet.delete(field);
      }

      newState.set(banquetId, newBanquet);
      return { banquetsEditing: newState };
    }),
}));
