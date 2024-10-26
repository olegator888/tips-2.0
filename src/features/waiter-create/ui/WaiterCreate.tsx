import { Button, Input } from "@/shared/ui";
import { FaPlus } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { InputChangeHandler } from "@/shared/model";
import { useWaitersListStore } from "@/shared/storage/waiter";
import { v4 } from "uuid";
import toast from "react-hot-toast";

export const WaiterCreate = () => {
  const { waitersList, addWaiter } = useWaitersListStore();

  const [name, setName] = useState("");

  const onNameChange: InputChangeHandler = (e) => setName(e.target.value);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name.length === 0) return;

    if (waitersList.some((item) => item.name === name)) {
      return toast.error("Такой официант уже есть", {
        id: name,
        duration: 1000,
      });
    }

    addWaiter({ id: v4(), name });
    setName("");
  };

  return (
    <form
      className="py-3 shrink-0 flex items-center gap-2 px-1"
      onSubmit={onSubmit}
    >
      <Input
        placeholder="Имя нового официанта"
        value={name}
        onChange={onNameChange}
      />
      <Button className="shrink-0">
        <FaPlus className="w-3 h-3" />
      </Button>
    </form>
  );
};
