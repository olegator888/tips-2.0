import { useWaitersSelectStore } from "@/shared/storage/waiter";
import { useEffect } from "react";

export const useWaitersSelectLS = () => {
  const { selectedWaiters, setSelectedWaiters } = useWaitersSelectStore();

  useEffect(() => {
    setSelectedWaiters(
      new Set(JSON.parse(localStorage.getItem("selectedWaiters") || "[]"))
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedWaiters",
      JSON.stringify(Array.from(selectedWaiters))
    );
  }, [selectedWaiters]);
};
