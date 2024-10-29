import { withAlert } from "@/features/alert";
import { useBanquetsAccountingStore } from "../storage";
import { Button } from "@/shared/ui";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { memo, useEffect } from "react";
import { cn, formatNumberWithSpaces } from "@/shared/lib";
import { socket } from "@/shared/websockets";
import { BanquetsWebsocketEvent } from "../model";

interface Props {
  handleAddBanquet: () => void;
}

export const ResultsBlock = memo((props: Props) => {
  const { handleAddBanquet } = props;

  const { banquets, kitchen, bar, removeAllBanquets, setKitchen, setBar } =
    useBanquetsAccountingStore();

  const handleRemoveAllBanquets = withAlert({
    onConfirm: () => {
      removeAllBanquets();
      socket.emit(BanquetsWebsocketEvent.REMOVE_ALL_BANQUETS);
    },
    title: "Удалить все банкеты",
    subtitle:
      "Вы уверены, что хотите удалить все банкеты? Введенные данные не сохранятся",
  });

  const results = [
    {
      label: "Кухня",
      value: kitchen,
    },
    {
      label: "Бар и Менеджер",
      value: bar,
    },
  ];

  // computing results
  useEffect(() => {
    let preordersSum = 0;
    let ordersSum = 0;

    banquets.forEach((banquet) => {
      preordersSum += banquet.preorder;
      ordersSum += banquet.order;
    });

    setKitchen(Math.floor(preordersSum * 0.2));
    setBar(Math.floor((preordersSum + ordersSum) * 0.1));
  }, [banquets]);

  return (
    <div className="py-2 shrink-0 flex items-center gap-2 px-1 border-t mt-1 w-full">
      <div className="flex items-center flex-1 flex-1 overflow-x-hidden">
        {results.map(({ label, value }, index) => (
          <div
            key={label}
            className={cn(
              "flex flex-col overflow-x-hidden px-3",
              index !== results.length - 1 && "border-r",
              index === 0 && "pl-0"
            )}
          >
            <div className="text-sm font-medium">{label}</div>
            <div className="text-sm w-full overflow-x-hidden text-ellipsis text-green-600 font-bold italic">
              {formatNumberWithSpaces(value)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {banquets.length > 1 && (
          <Button
            className="shrink-0 h-[40px] w-[40px] p-0"
            variant="destructive"
            onClick={handleRemoveAllBanquets}
          >
            <FaRegTrashCan />
          </Button>
        )}
        <Button
          className="shrink-0 h-[40px] w-[40px] p-0"
          onClick={handleAddBanquet}
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
});
