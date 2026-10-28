import axios, { type AxiosResponse } from "axios";

export function thunkErrorHandler(error: unknown): string | AxiosResponse {
   if (axios.isAxiosError(error)) {
      if (!error.response) return "Ошибка сети или сервер недоступен";

      return error.response;
   }

   if (error instanceof Error) {
      return error.message;
   }

   return "Непредвиденная ошибка";
}
