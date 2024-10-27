import { useBanquetsAccountingStore } from "../storage";
import { Empty } from "@/shared/ui";
import { useCallback, useRef } from "react";
import { BanquetsList } from "./BanquetsList";
import { ResultsBlock } from "./ResultsBlock";

export const BanquetsAccounting = () => {
  const { banquets, addBanquet } = useBanquetsAccountingStore();

  const banquetsListRef = useRef<HTMLDivElement | null>(null);

  const handleAddBanquet = useCallback(() => {
    addBanquet();

    if (!banquetsListRef.current) return;

    banquetsListRef.current?.scrollTo({
      top: banquetsListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [addBanquet, banquetsListRef.current]);

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
          <BanquetsList ref={banquetsListRef} />
          <ResultsBlock handleAddBanquet={handleAddBanquet} />
        </>
      )}
    </div>
  );
};
