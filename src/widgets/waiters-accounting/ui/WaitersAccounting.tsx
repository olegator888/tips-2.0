import { IWaiter, WaiterCard } from "@/entities/waiter";
import {
  useWaitersSelectStore,
  WaitersSelect,
} from "@/features/waiters-select";
import { useWaitersListStore } from "@/shared/storage/waiter";
import { useWaitersAccountingStore } from "../storage";
import { cn } from "@/shared/lib";
import { waiterAccountingCardGrid } from "@/shared/constants";
import { Button, Input } from "@/shared/ui";
import {
  InputChangeHandler,
  WaiterCardChangeHandler,
  WaiterHoursChangeHandler,
} from "@/shared/model";
import { normalizeInputNumberValue } from "@/shared/lib";
import { GrUserWorker } from "react-icons/gr";
import { useCallback } from "react";

const tableHead = ["Официант", "На карте", "Часы", "Чаевые"];

export const WaitersAccounting = () => {
  const { waitersList } = useWaitersListStore();
  const { selectedWaiters: selectedWaitersIds } = useWaitersSelectStore();
  const {
    waitersHours,
    waitersCards,
    waitersEarnings,
    cashTips,
    setCashTips,
    setWaiterHours,
    setWaiterCard,
    setWaitersEarnings,
  } = useWaitersAccountingStore();

  const selectedWaiters = waitersList
    .filter((waiter) => selectedWaitersIds.has(waiter.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const openWaitersSelect = () =>
    useWaitersSelectStore.setState({ isOpen: true });

  const handleWaiterHoursChange: WaiterHoursChangeHandler = useCallback(
    (waiterId, hours) => setWaiterHours(waiterId, hours),
    [setWaiterHours]
  );

  const handleWaiterCardChange: WaiterCardChangeHandler = useCallback(
    (waiterId, card) => setWaiterCard(waiterId, card),
    [setWaiterCard]
  );

  const handleTotalTipsChange: InputChangeHandler = useCallback(
    (e) => {
      const cashTips = Number(normalizeInputNumberValue(e.target.value));
      const totalTips =
        cashTips +
        Object.values(waitersCards).reduce((acc, cur) => acc + cur, 0);
      const totalHours = Object.values(waitersHours).reduce(
        (acc, cur) => acc + cur,
        0
      );
      const hourMoney = Math.floor(totalTips / totalHours);

      const waitersEarnings = new Map<IWaiter["id"], number>();

      selectedWaitersIds.forEach((waiterId) =>
        waitersEarnings.set(
          waiterId,
          hourMoney * (waitersHours.get(waiterId) || 0) -
            (waitersCards.get(waiterId) || 0)
        )
      );

      setWaitersEarnings(waitersEarnings);
      setCashTips(cashTips);
    },
    [
      selectedWaiters,
      waitersHours,
      waitersCards,
      setCashTips,
      setWaitersEarnings,
    ]
  );

  return (
    <>
      <div className="flex flex-col overflow-y-hidden h-full">
        <div className="flex flex-col overflow-y-hidden h-full">
          {selectedWaiters.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-5 h-full">
              <p className="text-[18px] text-center italic text-muted-foreground max-w-[350px]">
                Выберите официантов текущей смены, чтобы посчитать их чаевые
              </p>
              <Button onClick={openWaitersSelect}>Выбрать</Button>
            </div>
          )}
          {selectedWaiters.length > 0 && (
            <>
              <div className={cn("grid py-2", waiterAccountingCardGrid)}>
                {tableHead.map((item, i) => (
                  <div
                    key={item}
                    className={cn(
                      "flex items-center justify-center font-bold text-sm",
                      i === 0 && "justify-start",
                      i === tableHead.length - 1 && "justify-end"
                    )}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="h-full overflow-y-auto">
                {selectedWaiters.map((waiter, i) => (
                  <WaiterCard
                    key={waiter.id}
                    type="accounting"
                    index={i}
                    waiter={{
                      ...waiter,
                      hours: waitersHours.get(waiter.id) || 12,
                      card: waitersCards.get(waiter.id) || 0,
                      earnings: waitersEarnings.get(waiter.id) || 0,
                    }}
                    onHoursChange={handleWaiterHoursChange}
                    onCardChange={handleWaiterCardChange}
                  />
                ))}
              </div>
            </>
          )}
          {selectedWaiters.length > 0 && (
            <div className="py-3 shrink-0 flex items-center gap-2 px-1">
              <Input
                placeholder="Суммарные чаевые наличкой"
                type="tel"
                inputMode="numeric"
                value={cashTips || ""}
                onChange={handleTotalTipsChange}
              />
              <Button className="shrink-0" onClick={openWaitersSelect}>
                <GrUserWorker />
              </Button>
            </div>
          )}
        </div>
      </div>
      <WaitersSelect />
    </>
  );
};
