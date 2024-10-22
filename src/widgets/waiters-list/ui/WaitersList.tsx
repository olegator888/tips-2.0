import { WaiterCard } from "@/entities/waiter";
import { useWaitersListStore } from "@/shared/storage/waiter";
import { WaiterCreate } from "@/features/waiter-create";
import { useMemo } from "react";

export const WaitersList = () => {
  const { waitersList, removeWaiter } = useWaitersListStore();

  const waitersSorted = useMemo(
    () => waitersList.sort((a, b) => a.name.localeCompare(b.name)),
    [waitersList],
  );

  return (
    <div className="flex flex-col overflow-y-hidden h-full">
      <div className="h-full overflow-y-auto">
        {waitersSorted.map((waiter) => (
          <WaiterCard
            key={waiter.id}
            waiter={waiter}
            type="list"
            removeWaiter={removeWaiter}
          />
        ))}
      </div>
      <WaiterCreate />
    </div>
  );
};
