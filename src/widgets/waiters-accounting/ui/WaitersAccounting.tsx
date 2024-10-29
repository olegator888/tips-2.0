import { WaiterCard } from "@/entities/waiter";
import { WaitersSelect } from "@/features/waiters-select";
import {
  useWaitersAccountingLS,
  useWaitersAccountingStore,
  useWaitersListStore,
  useWaitersSelectStore,
} from "@/shared/storage/waiter";
import { cn } from "@/shared/lib";
import { waiterAccountingCardGrid } from "@/shared/constants";
import { Button, Input, Empty } from "@/shared/ui";
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
import { FaRegTrashCan } from "react-icons/fa6";
import { withAlert } from "@/features/alert";

const tableHead = ["Официант", "На карте", "Часы", "Чаевые"];

export const WaitersAccounting = () => {
  useWaitersAccountingLS();

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

  const handleUnselectAll = withAlert({
    onConfirm: () => {
      setSelectedWaiters(new Set());
      setHours(new Map());
      setCards(new Map());
      setEarnings(new Map());
    },
    title: "Очистить введенные данные",
    subtitle: "Вы уверены? Действие необратимо",
  });

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
            <Empty
              text="Выберите официантов текущей смены, чтобы посчитать их чаевые"
              actionText="Выбрать"
              action={openWaitersSelect}
            />
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
            <div className="py-2 shrink-0 flex items-center gap-2 px-1">
              <Input
                placeholder="Суммарные чаевые наличкой"
                type="tel"
                inputMode="numeric"
                value={cashTips || ""}
                onChange={handleTotalTipsChange}
              />
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  className="shrink-0 w-10 h-10 p-0"
                  variant="destructive"
                  onClick={handleUnselectAll}
                >
                  <FaRegTrashCan />
                </Button>
                <Button
                  className="shrink-0 w-10 h-10 p-0"
                  onClick={openWaitersSelect}
                >
                  <GrUserWorker />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <WaitersSelect toggleWaiterSelected={toggleWaiterSelected} />
    </>
  );
};
