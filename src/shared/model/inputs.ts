import { ChangeEvent } from "react";

export type InputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
export type InputKeyDownHandler = (
  e: React.KeyboardEvent<HTMLInputElement>
) => void;
export type SelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => void;
