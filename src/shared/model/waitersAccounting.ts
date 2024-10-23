import { IWaiter } from "@/entities/waiter";

export type WaiterHoursChangeHandler = (
  waiterId: IWaiter["id"],
  hours: number
) => void;
export type WaiterCardChangeHandler = (
  waiterId: IWaiter["id"],
  card: number
) => void;
export type WaiterEarningsChangeHandler = (
  waiterId: IWaiter["id"],
  hours: number
) => void;
