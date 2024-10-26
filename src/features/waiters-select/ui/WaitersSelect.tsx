import {
  Button,
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
  unselectAll: () => void;
  toggleWaiterSelected: (waiterId: IWaiter["id"]) => void;
}

export const WaitersSelect = memo((props: Props) => {
  const { toggleWaiterSelected, unselectAll } = props;

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
        <div className="flex flex-wrap gap-2.5 max-h-[60vh] overflow-y-auto justify-center pb-12 px-1">
          {waitersSorted.map((waiter) => (
            <WaitersSelectCard
              key={waiter.id}
              waiter={waiter}
              isSelected={selectedWaiters.has(waiter.id)}
              toggleWaiterSelected={toggleWaiterSelected}
            />
          ))}
        </div>
        {selectedWaiters.size > 0 && (
          <Button
            variant="destructive"
            className="absolute bottom-3 w-[calc(100%_-_16px)] left-1/2 -translate-x-1/2"
            onClick={unselectAll}
          >
            Убрать всех
          </Button>
        )}
      </DrawerContent>
    </Drawer>
  );
});
