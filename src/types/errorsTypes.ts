import { type PartialRecord } from "./default";

export type ValidationErrors<T> = PartialRecord<keyof T, string>;
