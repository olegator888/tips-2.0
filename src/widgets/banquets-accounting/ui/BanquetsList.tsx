import { forwardRef, memo } from "react";
import { useBanquetsAccountingStore } from "../storage";
import { BanquetAccountingCard } from "@/entities/banquet";

export const BanquetsList = memo(
  forwardRef<HTMLDivElement>((_, ref) => {
    const { banquets, updateBanquet, removeBanquet } =
      useBanquetsAccountingStore();

    return (
      <div ref={ref} className="overflow-y-auto p-1 flex flex-col gap-2 flex-1">
        <div className="mt-auto" />
        {banquets.map((banquet, index) => (
          <BanquetAccountingCard
            key={banquet.id}
            data={banquet}
            index={index}
            removeBanquet={removeBanquet}
            updateBanquet={updateBanquet}
            isRemoveAvailable={banquets.length > 1}
          />
        ))}
      </div>
    );
  })
);
