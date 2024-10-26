import { IWaiter, WaiterCard } from "@/entities/waiter";
import { useWaitersListStore } from "@/shared/storage/waiter";
import { WaiterCreate } from "@/features/waiter-create";
import { useMemo } from "react";
import { useToggleWaiterSelected } from "@/shared/hooks";

export const WaitersList = () => {
  const { waitersList, removeWaiter } = useWaitersListStore();

  const waitersSorted = useMemo(
    () => waitersList.sort((a, b) => a.name.localeCompare(b.name)),
    [waitersList]
  );

  const toggleWaiterSelected = useToggleWaiterSelected();

  const handleRemoveWaiter = (waiterId: IWaiter["id"]) => {
    removeWaiter(waiterId);
    toggleWaiterSelected(waiterId, true);
  };

  return (
    <div className="flex flex-col overflow-y-hidden h-full">
      <div className="h-full overflow-y-auto">
        {waitersSorted.map((waiter) => (
          <WaiterCard
            key={waiter.id}
            waiter={waiter}
            type="list"
            removeWaiter={handleRemoveWaiter}
          />
        ))}
      </div>
      <WaiterCreate />
    </div>
  );
};
