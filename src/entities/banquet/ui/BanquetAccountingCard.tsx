import { InputHTMLAttributes, memo, useEffect, useMemo, useRef } from "react";
import { IBanquetAccounting } from "../model";
import { Button, Input } from "@/shared/ui";
import { FaRegTrashCan } from "react-icons/fa6";
import { banquetAccountingCardGrid } from "@/shared/constants";
import { cn, normalizeInputNumberValue } from "@/shared/lib";
import { InputChangeHandler, InputKeyDownHandler } from "@/shared/model";

interface Props {
  data: IBanquetAccounting;
  index: number;
  removeBanquet: (id: string) => void;
  updateBanquet: (data: Partial<IBanquetAccounting>) => void;
  onInputKeyDown: InputKeyDownHandler;
}

export const BanquetAccountingCard = memo((props: Props) => {
  const { data, index, removeBanquet, updateBanquet, onInputKeyDown } = props;

  const preorderInputRef = useRef<HTMLInputElement | null>(null);

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
      onKeyDown: onInputKeyDown,
      type: "tel",
      inputMode: "numeric",
    }),
    [onInputKeyDown]
  );

  useEffect(() => {
    if (!preorderInputRef.current) return;
    preorderInputRef.current.focus();
  }, []);

  return (
    <div className={cn(banquetAccountingCardGrid)}>
      <div className="text-sm">{index + 1}.</div>
      <Input
        {...inputProps}
        ref={preorderInputRef}
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
      <Button
        variant="outline"
        className="h-[30px] w-[30px] p-0"
        onClick={handleRemoveBanquet}
      >
        <FaRegTrashCan className="text-rose-500" />
      </Button>
    </div>
  );
});
