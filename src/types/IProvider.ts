import { type ReactNode } from "react";

export interface IProvider<T> {
   children: ReactNode;
   value: T;
}
