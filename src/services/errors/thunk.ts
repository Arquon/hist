import axios from "axios";

export function thunkErrorHandler(error: unknown): unknown {
   if (axios.isAxiosError(error)) {
      if (!error.response?.data) return "Ошибка сети или сервер недоступен";

      return error.response.data;
   }

   if (error instanceof Error) {
      return error.message;
   }

   return "Непредвиденная ошибка";
}
