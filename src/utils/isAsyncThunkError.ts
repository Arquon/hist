import { type AnyAction } from "@reduxjs/toolkit";

export function isNewsAsyncThunkError(action: AnyAction): boolean {
   return action.type.startsWith("news") && action.type.endsWith("rejected");
}

export function isAuthAsyncThunkError(action: AnyAction): boolean {
   return action.type.startsWith("auth") && action.type.endsWith("rejected");
}
