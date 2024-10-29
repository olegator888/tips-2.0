import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdQuestionMark } from "react-icons/md";
import { useRoomStore } from "../storage";
import { WebsocketEvent } from "@/shared/model/websockets";
import { socketEmit } from "@/shared/websockets";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import { useWebsocketsStore } from "@/shared/storage/websockets";
import { JoinRoomDialog } from "./JoinRoomDialog";
import { useState } from "react";

export const BanquetsAccountingHeader = () => {
  const [isCreateRoom, setIsCreateRoom] = useState(false);
  const [joinRoomDialogOpen, setJoinRoomDialogOpen] = useState(false);

  const { currentRoom, participants, setCurrentRoom } = useRoomStore();
  const { connected: socketConnected } = useWebsocketsStore();

  const handleCreateRoom = () => {
    setIsCreateRoom(true);
    setJoinRoomDialogOpen(true);
  };

  const handleJoinRoom = () => {
    setIsCreateRoom(false);
    setJoinRoomDialogOpen(true);
  };

  const handleLeaveRoom = () => {
    socketEmit(WebsocketEvent.LEAVE_ROOM, currentRoom)
      .then(() => setCurrentRoom(null))
      .catch((error) => toast.error(error));
  };

  const copyRoomId = (roomId: string) => {
    navigator.clipboard.writeText(roomId);
    toast.success("ID комнаты скопирован", { id: "roomId" });
  };

  return (
    <div className="pb-1 px-2">
      <div className="flex items-center justify-between">
        {socketConnected && (
          <>
            {!!currentRoom && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="text-sm text-gray-400 font-medium">
                  {participants.length === 0
                    ? "В комнате только вы"
                    : participants.join(", ")}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="p-0 w-8 h-8"
                  onClick={() => copyRoomId(currentRoom)}
                >
                  <MdContentCopy />
                </Button>
              </div>
            )}
            {!currentRoom && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <div className="text-sm text-gray-400 font-medium">
                  Вы не в комнате
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="p-0 w-8 h-8">
                <MdQuestionMark />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="p-0 w-8 h-8">
                    <BsThreeDotsVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Комната</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {!currentRoom && (
                    <DropdownMenuItem onClick={handleCreateRoom}>
                      Создать
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleJoinRoom}>
                    Присоединиться
                  </DropdownMenuItem>
                  {!!currentRoom && (
                    <DropdownMenuItem
                      className="text-rose-500"
                      onClick={handleLeaveRoom}
                    >
                      Покинуть
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
        {!socketConnected && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="text-sm text-gray-400 font-medium">
              Соединение с сервером не установлено
            </div>
          </div>
        )}
      </div>
      <JoinRoomDialog
        open={joinRoomDialogOpen}
        onOpenChange={setJoinRoomDialogOpen}
        isCreate={isCreateRoom}
      />
    </div>
  );
};
