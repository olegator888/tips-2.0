import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithSpaces(number: number): string {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function loadMapFromLocalStorage(key: string) {
  const mapJson = localStorage.getItem(key);
  if (!mapJson) return new Map(); // Return empty Map if nothing stored

  // Parse JSON and convert back to Map
  return new Map(JSON.parse(mapJson));
}

export function saveMapToLocalStorage(key: string, map: Map<string, number>) {
  localStorage.setItem(key, JSON.stringify(Array.from(map.entries())));
}
