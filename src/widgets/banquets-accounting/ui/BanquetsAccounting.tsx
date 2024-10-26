import { BanquetAccountingCard } from "@/entities/banquet";
import { useBanquetsAccountingStore } from "../storage";
import { Button, Empty } from "@/shared/ui";
import { cn } from "@/shared/lib";
import {
  banquetAccountingCardGrid,
  navigationMenuHeight,
} from "@/shared/constants";
import { InputKeyDownHandler } from "@/shared/model";
import { useCallback, useRef } from "react";
import { FaPlus } from "react-icons/fa";

const tableHead = ["", "Предзаказы", "Дозаказы", ""];

export const BanquetsAccounting = () => {
  const { banquets, addBanquet, updateBanquet, removeBanquet } =
    useBanquetsAccountingStore();

  const banquetsListRef = useRef<HTMLDivElement | null>(null);

  const handleAddBanquet = () => {
    addBanquet();

    if (!banquetsListRef.current) return;

    banquetsListRef.current?.scrollTo({
      top: banquetsListRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleInputKeyDown: InputKeyDownHandler = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addBanquet();
      }
    },
    [addBanquet]
  );

  return (
    <div className="flex flex-col h-full overflow-y-hidden relative">
      {banquets.length === 0 && (
        <Empty
          text="Банкеты не добавлены"
          actionText="Добавить"
          action={handleAddBanquet}
        />
      )}
      {banquets.length > 0 && (
        <>
          <div className="flex flex-col gap-2 h-full overflow-y-hidden">
            <div
              className={cn("border-b px-1 pb-1", banquetAccountingCardGrid)}
            >
              {tableHead.map((item) => (
                <div key={item} className="text-center text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
            <div
              ref={banquetsListRef}
              className="overflow-y-auto py-1 px-1 flex flex-col gap-2 flex-1 border border-red-500"
            >
              {banquets.map((banquet, index) => (
                <BanquetAccountingCard
                  key={banquet.id}
                  data={banquet}
                  index={index}
                  removeBanquet={removeBanquet}
                  updateBanquet={updateBanquet}
                  onInputKeyDown={handleInputKeyDown}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <div className="h-[90px] flex items-center justify-center">results</div>
      <Button
        onClick={handleAddBanquet}
        variant="outline"
        className="h-14 w-14 p-0 rounded-full duration-300 transition-all"
      >
        <FaPlus className="text-green-500 w-5 h-5" />
      </Button>
    </div>
  );
};
