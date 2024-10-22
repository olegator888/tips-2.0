import { IWaiter, IWaiterAccounting } from "@/entities/waiter";
import {
  WaiterCardChangeHandler,
  WaiterHoursChangeHandler,
} from "@/shared/model";

type WaiterCardType = "list" | "accounting";

interface PropsBase {
  waiter: IWaiter | IWaiterAccounting;
  type: WaiterCardType;
}

interface WaiterList extends PropsBase {
  waiter: IWaiter;
  type: "list";
  removeWaiter: (waiterId: IWaiter["id"]) => void;
}

interface WaiterAccounting extends PropsBase {
  waiter: IWaiterAccounting;
  type: "accounting";
  index: number;
  onHoursChange: WaiterHoursChangeHandler;
  onCardChange: WaiterCardChangeHandler;
}

export type WaiterCardProps = WaiterList | WaiterAccounting;
