import { type IAuthData } from "@/services/auth.service";
import { type ValidationErrors } from "@/types/errorsTypes";
import axios from "axios";

interface NetworkErrors {
   _401: {
      unauthorized: string;
      default: string;
   };
   unhandled: string;
}

type DeepPartial<T> = T extends object
   ? {
        [P in keyof T]?: DeepPartial<T[P]>;
     }
   : T;

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

export function signInNetworkErrorsHandler(error: unknown): ValidationErrors<IAuthData> | string {
   if (axios.isAxiosError(error)) {
      if (!error.response) throw new Error("Axios Error");
      const { code, message }: { code: number; message: string } = error.response.data.error;
      const errorObject: ValidationErrors<IAuthData> = {};
      if (code === 400) {
         switch (message) {
            case "INVALID_EMAIL":
               errorObject.email = "Введен некорректный email";
               return errorObject;
            case "EMAIL_NOT_FOUND":
               errorObject.email = "Пользователь с указанным email не зарегистрирован";
               return errorObject;
            case "INVALID_PASSWORD":
               errorObject.password = "Введен неверный пароль";
               return errorObject;
            default:
               if (message.startsWith("TOO_MANY_ATTEMPTS")) return "Слишком много попыток входа";
               return "Непредвиденная ошибка";
         }
      }
      return "Unhandled Axios Error";
   }

   return "Unhandled Error";
}

export function signUpNetworkErrorsHandler(error: unknown): ValidationErrors<IAuthData> | string {
   if (axios.isAxiosError(error)) {
      if (!error.response) throw new Error("Axios Error");
      const { code, message }: { code: number; message: string } = error.response.data.error;
      const errorObject: ValidationErrors<IAuthData> = {};
      if (code === 400) {
         switch (message) {
            case "INVALID_EMAIL":
               errorObject.email = "Введен некорректный email";
               return errorObject;
            case "EMAIL_NOT_FOUND":
               errorObject.email = "Пользователь с указанным email не зарегистрирован";
               return errorObject;
            case "INVALID_PASSWORD":
               errorObject.password = "Введен неверный пароль";
               return errorObject;
            default:
               return "Непредвиденная ошибка";
         }
      }
      return "Unhandled Axios Error";
   }
   return "Unhandled Error";
}
