import { InputHTMLAttributes, memo, useMemo } from "react";
import { IBanquetAccounting } from "../model";
import { Button, Input } from "@/shared/ui";
import { FaRegTrashCan } from "react-icons/fa6";
import { banquetAccountingCardGrid } from "@/shared/constants";
import { cn, normalizeInputNumberValue } from "@/shared/lib";
import { InputChangeHandler } from "@/shared/model";

interface Props {
  data: IBanquetAccounting;
  index: number;
  isRemoveAvailable: boolean;
  removeBanquet: (id: string) => void;
  updateBanquet: (data: Partial<IBanquetAccounting>) => void;
}

export const BanquetAccountingCard = memo((props: Props) => {
  const { data, index, isRemoveAvailable, removeBanquet, updateBanquet } =
    props;

  const handlePreorderChange: InputChangeHandler = (e) => {
    updateBanquet({
      ...data,
      preorder: Number(normalizeInputNumberValue(e.target.value)),
    });
  };

  const handleOrderChange: InputChangeHandler = (e) => {
    updateBanquet({
      ...data,
      order: Number(normalizeInputNumberValue(e.target.value)),
    });
  };

  const handleRemoveBanquet = () => {
    removeBanquet(data.id);
  };

  const inputProps: Partial<InputHTMLAttributes<HTMLInputElement>> = useMemo(
    () => ({
      className: "h-[30px] text-center",
      type: "tel",
      inputMode: "numeric",
    }),
    []
  );

  return (
    <div
      className={cn(
        "grid items-center gap-2",
        isRemoveAvailable
          ? banquetAccountingCardGrid
          : "grid-cols-[15px_1fr_1fr]"
      )}
    >
      <div className="text-sm">{index + 1}.</div>
      <Input
        {...inputProps}
        placeholder="Предзаказ"
        value={data.preorder || ""}
        onChange={handlePreorderChange}
      />
      <Input
        {...inputProps}
        placeholder="Дозаказ"
        value={data.order || ""}
        onChange={handleOrderChange}
      />
      {isRemoveAvailable && (
        <Button
          variant="outline"
          className="h-[30px] w-[30px] p-0"
          onClick={handleRemoveBanquet}
        >
          <FaRegTrashCan className="text-rose-500" />
        </Button>
      )}
    </div>
  );
});
