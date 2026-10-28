import { type ServerErrorPayload, type ValidationErrors } from "@/types/common";
import { type AuthData } from "../http/auth.service";

export function signInNetworkErrorsHandler(serverErrorPayload: unknown): Partial<ValidationErrors<AuthData>> | string {
   if (typeof serverErrorPayload === "string") {
      return serverErrorPayload;
   }

   const payload = serverErrorPayload as ServerErrorPayload;

   const { code, message } = payload;
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

   const payload = serverErrorPayload as ServerErrorPayload;

   const { code, message } = payload;
   const errorObject: Partial<ValidationErrors<AuthData>> = {};
   if (code === 400) {
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
