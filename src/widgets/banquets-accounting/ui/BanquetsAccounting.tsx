import {
  useBanquetsAccountingLS,
  useBanquetsAccountingStore,
} from "../storage";
import { Empty } from "@/shared/ui";
import { useCallback, useRef } from "react";
import { BanquetsList } from "./BanquetsList";
import { ResultsBlock } from "./ResultsBlock";
import { socket } from "@/shared/websockets";
import { v4 } from "uuid";
import { BanquetsWebsocketEvent } from "../model";
import { BanquetsAccountingHeader } from "./BanquetsAccountingHeader";
import { useWebsocketRoom, useBanquetsAccountingWebsockets } from "../hooks";

export const BanquetsAccounting = () => {
  useBanquetsAccountingLS();
  useBanquetsAccountingWebsockets();
  useWebsocketRoom();

  const { banquets, addBanquet } = useBanquetsAccountingStore();

  const banquetsListRef = useRef<HTMLDivElement | null>(null);

  const handleAddBanquet = useCallback(() => {
    const newBanquet = { id: v4(), order: 0, preorder: 0 };
    addBanquet(newBanquet);
    socket.emit(BanquetsWebsocketEvent.CREATE_BANQUET, newBanquet);

    if (!banquetsListRef.current) return;

    banquetsListRef.current?.scrollTo({
      top: banquetsListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [addBanquet, banquetsListRef.current]);

  return (
    <div className="flex flex-col h-full overflow-y-hidden relative">
      <BanquetsAccountingHeader />
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
