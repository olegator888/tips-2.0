import { useEffect } from "react";
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

export const useUserDataLS = () => {
  const { userName, setUserName } = useUserDataStore();

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);
};
