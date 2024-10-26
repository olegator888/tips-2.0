import { useCallback } from "react";
import { useWaitersAccountingStore } from "../storage/waiter";
import { IWaiter } from "@/entities/waiter";

export const useComputeWaitersEarnings = () => {
  const setEarnings = useWaitersAccountingStore().setEarnings;

  const computeWaitersEarnings = useCallback(
    ({
      cashTips,
      hours,
      cards,
      selectedWaitersIds,
    }: {
      cashTips: number;
      hours: Map<string, number>;
      cards: Map<string, number>;
      selectedWaitersIds: Set<IWaiter["id"]>;
    }) => {
      const totalTips =
        cashTips + [...cards.values()].reduce((acc, curr) => acc + curr, 0);
      let totalHours = [...hours.values()].reduce((acc, curr) => acc + curr, 0);
      const tipsPerHour = totalTips / totalHours;

      const earnings = new Map();
      for (const waiterId of selectedWaitersIds) {
        earnings.set(
          waiterId,
          Math.floor(tipsPerHour * (hours.get(waiterId) || 0))
        );
      }

      setEarnings(earnings);
    },
    [setEarnings]
  );

  return computeWaitersEarnings;
};
