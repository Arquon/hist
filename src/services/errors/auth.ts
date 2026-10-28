import { type BackendErrorBody, type ValidationErrors } from "@/types/common";
import { type AuthData } from "../http/auth.service";
import { type AxiosResponse } from "axios";

export function signInNetworkErrorsHandler(serverErrorPayload: unknown): Partial<ValidationErrors<AuthData>> | string {
   if (typeof serverErrorPayload === "string") {
      return serverErrorPayload;
   }

   const payload = serverErrorPayload as AxiosResponse<BackendErrorBody>;

   if (!payload.data.error) return "Непредвиденная ошибка сервера";

   const { code, message } = payload.data.error;
   const errorObject: Partial<ValidationErrors<AuthData>> = {};
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
            if (message.startsWith("TOO_MANY_ATTEMPTS")) return "Попробуйте позже";
            return "Непредвиденная ошибка валидации";
      }
   }

   return "Непредвиденная ошибка сервера";
}

export function signUpNetworkErrorsHandler(serverErrorPayload: unknown): Partial<ValidationErrors<AuthData>> | string {
   if (typeof serverErrorPayload === "string") {
      return serverErrorPayload;
   }

   const payload = serverErrorPayload as AxiosResponse<BackendErrorBody>;

   if (!payload.data.error) return "Непредвиденная ошибка сервера";
   const { code, message } = payload.data.error;

   const errorObject: Partial<ValidationErrors<AuthData>> = {};
   if (code === 400 && message) {
      switch (message) {
         case "INVALID_EMAIL":
            errorObject.email = "Введен некорректный email";
            return errorObject;
         case "EMAIL_EXISTS":
            errorObject.email = "Пользователь с указанным email уже зарегистрирован";
            return errorObject;
         default:
            return "Непредвиденная ошибка валидации";
      }
   }

   return "Непредвиденная ошибка сервера";
}
