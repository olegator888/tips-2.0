import { WaiterCardProps } from "../model";
import { cn, normalizeInputNumberValue } from "@/shared/lib";
import { Button, Input } from "@/shared/ui";
import { FaRegTrashCan } from "react-icons/fa6";
import { memo } from "react";
import { waiterAccountingCardGrid } from "@/shared/constants";
import { InputChangeHandler, SelectChangeHandler } from "@/shared/model";

export const WaiterCard = memo((props: WaiterCardProps) => {
  const { type, waiter } = props;

  const handleRemoveWaiter = () =>
    type === "list" && props.removeWaiter(waiter.id);

  const handleHoursChange: SelectChangeHandler = (e) => {
    if (props.type !== "accounting") return;
    props.onHoursChange(waiter.id, Number(e.target.value));
  };

  const handleCardChange: InputChangeHandler = (e) => {
    if (props.type !== "accounting") return;
    props.onCardChange(
      waiter.id,
      Number(normalizeInputNumberValue(e.target.value))
    );
  };

  return (
    <div
      className={cn(
        "h-[40px] grid items-center text-sm border-b last:border-none relative px-1",
        type === "list" && "grid-cols-[1fr_50px]",
        type === "accounting" && waiterAccountingCardGrid
      )}
    >
      <div className="flex items-center gap-2 w-full overflow-hidden">
        {type === "accounting" && (
          <div className="font-medium">{props.index + 1}.</div>
        )}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {waiter.name}
        </div>
      </div>
      {type === "accounting" && (
        <>
          <div className="flex items-center justify-center">
            <Input
              className="w-[80px] h-[26px] px-1 text-center"
              type="tel"
              inputMode="decimal"
              value={waiter.card}
              onChange={handleCardChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <select value={waiter.hours} onChange={handleHoursChange}>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end">{waiter.earnings}</div>
        </>
      )}
      {type === "list" && (
        <div className="flex justify-end">
          <Button
            onClick={handleRemoveWaiter}
            variant="ghost"
            className="h-[30px] w-[30px] p-0"
          >
            <FaRegTrashCan className="text-rose-500" />
          </Button>
        </div>
      )}
    </div>
  );
});
