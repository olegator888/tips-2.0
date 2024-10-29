import { forwardRef, memo, useCallback } from "react";
import { useBanquetsAccountingStore, useRoomStore } from "../storage";
import { BanquetAccountingCard, IBanquetAccounting } from "@/entities/banquet";
import { socket } from "@/shared/websockets";
import { BanquetsWebsocketEvent } from "../model";
import { useUserDataStore } from "@/shared/storage/user";
import { WebsocketEvent } from "@/shared/model/websockets";
import { ToggleBanquetEditingProps } from "@/shared/model";

export const BanquetsList = memo(
  forwardRef<HTMLDivElement>((_, ref) => {
    const { banquets, updateBanquet, removeBanquet } =
      useBanquetsAccountingStore();
    const { banquetsEditing } = useRoomStore();
    const { userName } = useUserDataStore();

    const handleUpdateBanquet = useCallback(
      (data: Partial<IBanquetAccounting>) => {
        updateBanquet(data);
        socket.emit(BanquetsWebsocketEvent.UPDATE_BANQUET, data);
      },
      [updateBanquet]
    );

    const handleRemoveBanquet = useCallback(
      (id: string) => {
        removeBanquet(id);
        socket.emit(BanquetsWebsocketEvent.REMOVE_BANQUET, id);
      },
      [removeBanquet]
    );

    const handleInputFocusChange = useCallback(
      (props: Omit<ToggleBanquetEditingProps, "userName">) =>
        socket.emit(WebsocketEvent.INPUT_FOCUS_CHANGE, {
          ...props,
          userName,
        }),
      [userName]
    );

    return (
      <div ref={ref} className="overflow-y-auto p-1 flex flex-col gap-2 flex-1">
        <div className="mt-auto" />
        {banquets.map((banquet, index) => (
          <BanquetAccountingCard
            key={banquet.id}
            data={banquet}
            index={index}
            removeBanquet={handleRemoveBanquet}
            updateBanquet={handleUpdateBanquet}
            isRemoveAvailable={banquets.length > 1}
            handleInputFocusChange={handleInputFocusChange}
            editingData={banquetsEditing.get(banquet.id)}
          />
        ))}
      </div>
    );
  })
);
