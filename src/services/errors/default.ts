import { type DeepPartial } from "@/types/common";
import { type AxiosResponse } from "axios";

export interface NetworkErrors {
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
   if (typeof error === "string") {
      return error;
   }

   const typedError = error as AxiosResponse;

   const { statusText, status: code } = typedError;

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
