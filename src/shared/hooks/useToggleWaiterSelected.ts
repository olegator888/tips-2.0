import {
  useWaitersAccountingStore,
  useWaitersSelectStore,
} from "@/shared/storage/waiter";
import { useComputeWaitersEarnings } from "./useComputeWaitersEarnings";
import { IWaiter } from "@/entities/waiter";

export const useToggleWaiterSelected = () => {
  const { hours, cards, earnings, cashTips, setCards, setHours, setEarnings } =
    useWaitersAccountingStore();
  const { selectedWaiters, setSelectedWaiters } = useWaitersSelectStore();

  const computeWaitersEarnings = useComputeWaitersEarnings();

  const toggleWaiterSelected = (
    waiterId: IWaiter["id"],
    isDeleting?: boolean
  ) => {
    const newSelectedWaiters = new Set(selectedWaiters);

    const newHours = new Map(hours);
    const newCards = new Map(cards);
    const newEarnings = new Map(earnings);
    const isSelected = newSelectedWaiters.has(waiterId);

    if (isSelected || isDeleting) {
      newCards.delete(waiterId);
      newHours.delete(waiterId);
      newEarnings.delete(waiterId);
      newSelectedWaiters.delete(waiterId);
    } else {
      newHours.set(waiterId, 12);
      newCards.set(waiterId, 0);
      newEarnings.set(waiterId, 0);
      newSelectedWaiters.add(waiterId);
    }

    setCards(newCards);
    setHours(newHours);
    setEarnings(newEarnings);
    setSelectedWaiters(newSelectedWaiters);

    computeWaitersEarnings({
      cashTips,
      hours: newHours,
      cards: newCards,
      selectedWaitersIds: newSelectedWaiters,
    });
  };

  return toggleWaiterSelected;
};
