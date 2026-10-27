// import { type AxiosError } from "axios";

import { type ObjectTypeWithLength } from "@/types/common";

// export function isNetworkError(error: unknown): error is AxiosError {
//    return typeof error === "object" && error !== null && "message" in error;
// }

export function isString(value: unknown): value is string {
   return typeof value === "string";
}

export function isObjectWithLength(value: unknown): value is ObjectTypeWithLength {
   return typeof value === "object" && value !== null && "length" in value;
}
