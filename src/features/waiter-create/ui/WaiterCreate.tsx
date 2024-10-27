import { Button, Input } from "@/shared/ui";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { FormEvent, useRef, useState } from "react";
import { InputChangeHandler } from "@/shared/model";
import { useWaitersListStore } from "@/shared/storage/waiter";
import { v4 } from "uuid";
import toast from "react-hot-toast";
import { withAlert } from "@/features/alert";

export const WaiterCreate = () => {
  const { waitersList, addWaiter, removeAllWaiters } = useWaitersListStore();

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onNameChange: InputChangeHandler = (e) => {
    setName(e.target.value);
    setError(false);
  };

  const handleRemoveAllWaiters = withAlert({
    onConfirm: removeAllWaiters,
    title: "Удалить всех официантов",
    subtitle: "Вы уверены? Действие необратимо",
  });

  const validate = () => {
    let error = "";

    if (name.length === 0) {
      error = "Введите имя официанта";
    }

    if (waitersList.some((item) => item.name === name)) {
      error = "Такой официант уже есть";
    }

    if (error) {
      toast.error(error, {
        id: name,
        duration: 1000,
        position: "bottom-center",
      });
      setError(true);
      inputRef.current?.focus();
      return false;
    }

    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    addWaiter({ id: v4(), name });
    setName("");
  };

  return (
    <form
      className="py-2 shrink-0 flex items-center gap-2 px-1"
      onSubmit={onSubmit}
    >
      <Input
        ref={inputRef}
        placeholder="Имя нового официанта"
        value={name}
        onChange={onNameChange}
        hasError={error}
      />
      <div className="flex items-center gap-2 shrink-0">
        {waitersList.length > 0 && (
          <Button
            className="shrink-0 w-10 h-10 p-0"
            variant="destructive"
            type="button"
            onClick={handleRemoveAllWaiters}
          >
            <FaRegTrashCan />
          </Button>
        )}
        <Button className="shrink-0 w-10 h-10 p-0" type="submit">
          <FaPlus />
        </Button>
      </div>
    </form>
  );
};
