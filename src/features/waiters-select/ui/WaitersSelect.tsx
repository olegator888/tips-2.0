import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui";
import { memo, useEffect, useMemo } from "react";
import {
  useWaitersListStore,
  useWaitersSelectStore,
} from "@/shared/storage/waiter";
import { WaitersSelectCard } from "./WaitersSelectCard.tsx";
import { IWaiter } from "@/entities/waiter";

interface Props {
  toggleWaiterSelected: (waiterId: IWaiter["id"]) => void;
}

export const WaitersSelect = memo((props: Props) => {
  const { toggleWaiterSelected } = props;

  const { isOpen, selectedWaiters, setIsOpen } = useWaitersSelectStore();
  const { waitersList } = useWaitersListStore();

  const waitersSorted = useMemo(
    () => waitersList.sort((a, b) => a.name.localeCompare(b.name)),
    [waitersList]
  );

  useEffect(() => {
    if (selectedWaiters.size === 0) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="pb-4">
        <DrawerHeader>
          <DrawerTitle>Выбор официантов</DrawerTitle>
          <DrawerDescription>
            Выберите официантов текущей смены
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-wrap gap-2.5 max-h-[60vh] overflow-y-auto justify-center pb-4 px-1">
          {waitersSorted.map((waiter) => (
            <WaitersSelectCard
              key={waiter.id}
              waiter={waiter}
              isSelected={selectedWaiters.has(waiter.id)}
              toggleWaiterSelected={toggleWaiterSelected}
            />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
});
