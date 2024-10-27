import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithSpaces(number: number): string {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
