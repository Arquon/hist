import { type DeepPartial } from "@/types/common";
import axios from "axios";

interface NetworkErrors {
   _401: {
      unauthorized: string;
      default: string;
   };
   unhandled: string;
}

function networkErrorsHandler(
   error: unknown,
   defaultErrorMessages: NetworkErrors,
   customErrorMessages?: DeepPartial<NetworkErrors>
): string {
   if (axios.isAxiosError(error)) {
      if (!error.response) return "Axios Error";
      const { statusText, status: code } = error.response;
      if (code === 401) {
         switch (statusText) {
            case "Unauthorized":
               return customErrorMessages?._401?.unauthorized ?? defaultErrorMessages._401.unauthorized;
            default:
               return customErrorMessages?._401?.default ?? defaultErrorMessages._401.default;
         }
      }
      return customErrorMessages?.unhandled ?? defaultErrorMessages.unhandled;
   }

   return "Unhandled Error";
}

const defaultNetworkErrorsMessages: NetworkErrors = {
   _401: {
      unauthorized: "Недостаточно прав",
      default: "Непредвиденная ошибка",
   },
   unhandled: "Unhandled Axios Error",
};

function netWorkErrorsHandlerGenerator(defaultNetworkErrors: NetworkErrors = defaultNetworkErrorsMessages) {
   return function (error: unknown, customErrorMessages?: DeepPartial<NetworkErrors>) {
      return networkErrorsHandler(error, defaultNetworkErrors, customErrorMessages);
   };
}

export const newsNetworkErrorsHandler = netWorkErrorsHandlerGenerator();

export const userNetworkErrorsHandler = netWorkErrorsHandlerGenerator();
