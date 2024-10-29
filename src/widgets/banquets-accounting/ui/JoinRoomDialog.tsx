import { WebsocketEvent } from "@/shared/model/websockets";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/shared/ui";
import { socketEmit } from "@/shared/websockets";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { useRoomStore } from "../storage";
import { useState } from "react";
import { InputChangeHandler } from "@/shared/model";
import { useUserDataLS, useUserDataStore } from "@/shared/storage/user";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isCreate?: boolean;
}

export const JoinRoomDialog = (props: Props) => {
  useUserDataLS();

  const { open, onOpenChange, isCreate } = props;

  const { userName, setUserName } = useUserDataStore();
  const [roomId, setRoomId] = useState("");

  const { setCurrentRoom } = useRoomStore();

  const createRoom = () => {
    const roomId = v4();

    socketEmit(WebsocketEvent.CREATE_ROOM, { roomId, userName })
      .then(() => {
        setCurrentRoom(roomId);
        onOpenChange(false);
        navigator.clipboard.writeText(roomId);
        toast.success("ID комнаты скопирован", { id: "roomId" });
      })
      .catch((error) => toast.error(error));
  };

  const joinRoom = () => {
    socketEmit(WebsocketEvent.JOIN_ROOM, { roomId, userName })
      .then(() => {
        setCurrentRoom(roomId);
        onOpenChange(false);
      })
      .catch((error) => toast.error(error));
  };

  const handleUserNameChange: InputChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const handleRoomIdChange: InputChangeHandler = (e) => {
    setRoomId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCreate) {
      createRoom();
    } else {
      joinRoom();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCreate ? "Введите свое имя" : "Введите свое имя и ID комнаты"}
          </DialogTitle>
          {!isCreate && (
            <DialogDescription>
              Его вам может предоставить создатель комнаты
            </DialogDescription>
          )}
        </DialogHeader>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Ваше имя"
            value={userName}
            onChange={handleUserNameChange}
          />
          {!isCreate && (
            <Input
              placeholder="ID комнаты"
              value={roomId}
              onChange={handleRoomIdChange}
            />
          )}
          <Button type="submit">
            {isCreate ? "Создать комнату" : "Присоединиться"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
