import { IWaiter, WaiterCard } from "@/entities/waiter";
import { useWaitersListLS, useWaitersListStore } from "@/shared/storage/waiter";
import { WaiterCreate } from "@/features/waiter-create";
import { useMemo } from "react";
import { useToggleWaiterSelected } from "@/shared/hooks";
import { Empty } from "@/shared/ui";

export const WaitersList = () => {
  useWaitersListLS();

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
      {waitersSorted.length === 0 && <Empty text="Официанты не добавлены" />}
      {waitersSorted.length > 0 && (
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
      )}
      <WaiterCreate />
    </div>
  );
};
