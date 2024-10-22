import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui";
import { useEffect, useMemo } from "react";
import { useWaitersListStore } from "@/shared/storage/waiter";
import { useWaitersSelectStore } from "../storage";
import { WaitersSelectCard } from "./WaitersSelectCard.tsx";

export const WaitersSelect = () => {
  const {
    isOpen,
    selectedWaiters,
    setIsOpen,
    toggleWaiterSelected,
    unselectAll,
  } = useWaitersSelectStore();
  const { waitersList } = useWaitersListStore();

  const waitersSorted = useMemo(
    () =>
      waitersList.sort((a, b) => {
        // if (selectedWaiters.has(a.id) && !selectedWaiters.has(b.id)) {
        //   return -1;
        // }
        // if (selectedWaiters.has(b.id) && !selectedWaiters.has(a.id)) {
        //   return 1;
        // }
        return a.name.localeCompare(b.name);
      }),
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
        <div className="flex flex-wrap gap-2.5 max-h-[60vh] overflow-y-auto justify-center pb-12">
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
};
