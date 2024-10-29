import { InputHTMLAttributes, memo, ReactNode, useMemo } from "react";
import { IBanquetAccounting } from "../model";
import { Button, Input } from "@/shared/ui";
import { FaRegTrashCan } from "react-icons/fa6";
import { banquetAccountingCardGrid } from "@/shared/constants";
import { cn, normalizeInputNumberValue } from "@/shared/lib";
import { IBanquetField, InputChangeHandler } from "@/shared/model";
import { ToggleBanquetEditingProps } from "@/shared/model";

interface Props {
  data: IBanquetAccounting;
  index: number;
  isRemoveAvailable: boolean;
  editingData: Map<string, string> | undefined;
  removeBanquet: (id: string) => void;
  updateBanquet: (data: Partial<IBanquetAccounting>) => void;
  handleInputFocusChange: (
    props: Omit<ToggleBanquetEditingProps, "userName">
  ) => void;
}

export const BanquetAccountingCard = memo((props: Props) => {
  const {
    data,
    index,
    isRemoveAvailable,
    editingData,
    removeBanquet,
    updateBanquet,
    handleInputFocusChange,
  } = props;

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

  const onInputFocusChange = (field: IBanquetField, isEditing: boolean) =>
    handleInputFocusChange({
      banquetId: data.id,
      field,
      isEditing,
    });

  const preorderEditor = editingData?.get("preorder");
  const orderEditor = editingData?.get("order");

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

      <InputEditorWrapper editor={preorderEditor}>
        <Input
          {...inputProps}
          placeholder="Предзаказ"
          value={data.preorder || ""}
          onChange={handlePreorderChange}
          onFocus={() => onInputFocusChange("preorder", true)}
          onBlur={() => onInputFocusChange("preorder", false)}
          className={cn(preorderEditor && "border-2 border-green-600")}
          disabled={!!preorderEditor}
        />
      </InputEditorWrapper>

      <InputEditorWrapper editor={orderEditor}>
        <Input
          {...inputProps}
          placeholder="Дозаказ"
          value={data.order || ""}
          onChange={handleOrderChange}
          onFocus={() => onInputFocusChange("order", true)}
          onBlur={() => onInputFocusChange("order", false)}
          className={cn(orderEditor && "border-2 border-green-600")}
          disabled={!!orderEditor}
        />
      </InputEditorWrapper>

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

const InputEditorWrapper = ({
  children,
  editor,
}: {
  children: ReactNode;
  editor: string | undefined;
}) => (
  <div className="relative">
    {editor && (
      <div className="absolute right-1 top-0 text-[10px] text-green-600">
        {editor}
      </div>
    )}
    {children}
  </div>
);
