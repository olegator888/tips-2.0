import { WaiterCard } from "@/entities/waiter";
import {
  useWaitersSelectStore,
  WaitersSelect,
} from "@/features/waiters-select";
import {
  useWaitersAccountingStore,
  useWaitersListStore,
} from "@/shared/storage/waiter";
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
import {
  useComputeWaitersEarnings,
  useToggleWaiterSelected,
} from "@/shared/hooks";

const tableHead = ["Официант", "На карте", "Часы", "Чаевые"];

export const WaitersAccounting = () => {
  const { waitersList } = useWaitersListStore();
  const { selectedWaiters: selectedWaitersIds, setSelectedWaiters } =
    useWaitersSelectStore();
  const {
    cashTips,
    setCashTips,
    hours,
    cards,
    earnings,
    setHours,
    setCards,
    setEarnings,
  } = useWaitersAccountingStore();

  const toggleWaiterSelected = useToggleWaiterSelected();
  const computeWaitersEarnings = useComputeWaitersEarnings();

  const selectedWaiters = waitersList
    .filter((waiter) => selectedWaitersIds.has(waiter.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleUnselectAll = () => {
    setSelectedWaiters(new Set());
    setHours(new Map());
    setCards(new Map());
    setEarnings(new Map());
  };

  const openWaitersSelect = () =>
    useWaitersSelectStore.setState({ isOpen: true });

  const handleWaiterHoursChange: WaiterHoursChangeHandler = useCallback(
    (waiterId, hoursValue) => {
      const newHours = new Map(hours);
      newHours.set(waiterId, hoursValue);
      setHours(newHours);
      computeWaitersEarnings({
        cashTips,
        hours: newHours,
        cards,
        selectedWaitersIds,
      });
    },
    [hours, setHours, computeWaitersEarnings, cashTips, cards]
  );

  const handleWaiterCardChange: WaiterCardChangeHandler = useCallback(
    (waiterId, cardValue) => {
      const newCards = new Map(cards);
      newCards.set(waiterId, cardValue);
      setCards(newCards);
      computeWaitersEarnings({
        cashTips,
        hours,
        cards: newCards,
        selectedWaitersIds,
      });
    },
    [cards, setCards, computeWaitersEarnings, cashTips, hours]
  );

  const handleTotalTipsChange: InputChangeHandler = useCallback(
    (e) => {
      const cashTips = Number(normalizeInputNumberValue(e.target.value));
      computeWaitersEarnings({
        cashTips,
        hours,
        cards,
        selectedWaitersIds,
      });
      setCashTips(cashTips);
    },
    [computeWaitersEarnings, setCashTips, hours, cards]
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
                      hours: hours.get(waiter.id) || 0,
                      card: cards.get(waiter.id) || 0,
                      earnings: earnings.get(waiter.id) || 0,
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
      <WaitersSelect
        toggleWaiterSelected={toggleWaiterSelected}
        unselectAll={handleUnselectAll}
      />
    </>
  );
};
