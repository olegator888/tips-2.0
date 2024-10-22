import { IWaiter } from "./waiter";

export interface IWaiterAccounting extends IWaiter {
  hours: number;
  card: number;
  earnings: number;
}
