import { type PartialRecord } from "./PartialRecord";

export type ValidationErrors<T> = PartialRecord<keyof T, string>;
