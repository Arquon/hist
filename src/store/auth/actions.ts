import { authService, type IRegistrationData, type IAuthData } from "@/services/auth.service";
import { actions } from "./slice";
import { type AppActionType } from "../store";
import { type NetworkErrors } from "@/hooks/useErrors";
import { localStorageService } from "@/services/localStorage.service";
import axios from "axios";

const authActions = {
   signIn:
      (authData: IAuthData): AppActionType =>
      async (dispatch, getState) => {
         try {
            const data = await authService.signIn(authData);
            localStorageService.setCredentials(data);
            const userData = await authService.getUserData(data.localId);
            dispatch(actions.setCurrentUser(userData));
         } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
               if (!error.response) throw new Error("Axios Error");
               const { code, message }: { code: number; message: string } = error.response.data.error;
               const errorObject: NetworkErrors<IAuthData> = {};
               if (code === 400) {
                  switch (message) {
                     case "INVALID_EMAIL":
                        errorObject.email = "Введен некорректный email";
                        throw errorObject;
                     case "EMAIL_NOT_FOUND":
                        errorObject.email = "Пользователь с указанным email не зарегистрирован";
                        throw errorObject;
                     case "INVALID_PASSWORD":
                        errorObject.password = "Введен неверный пароль";
                        throw errorObject;
                     default:
                        throw new Error("Непредвиденная ошибка");
                  }
               }
               throw new Error("Unhandled Axios Error");
            }
            throw new Error("Unhandled Error");
         }
      },
   signUp:
      (registrationData: IRegistrationData): AppActionType =>
      async (dispatch, getState) => {
         try {
            const data = await authService.registration(registrationData);
            localStorageService.setCredentials(data);
            const userData = await authService.createUser(registrationData, data.localId);
            dispatch(actions.setCurrentUser(userData));
         } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
               if (!error.response) throw new Error("Axios Error");
               const { code, message }: { code: number; message: string } = error.response.data.error;
               const errorObject: NetworkErrors<IAuthData> = {};
               if (code === 400) {
                  switch (message) {
                     case "INVALID_EMAIL":
                        errorObject.email = "Введен некорректный email";
                        throw errorObject;
                     case "EMAIL_EXISTS":
                        errorObject.email = "Пользователь с указанным email уже зарегистрирован";
                        throw errorObject;
                     default:
                        throw new Error("Непредвиденная ошибка");
                  }
               }
               throw new Error("Unhandled Axios Error");
            }
            throw new Error("Unhandled Error");
         }
      },
   signOut: (): AppActionType => (dispatch, getState) => {
      dispatch(actions.setCurrentUser(null));
      localStorageService.removeCredentials();
   },
   getCurrentUserData: (): AppActionType => async (dispatch, getState) => {
      const { localId } = localStorageService.getCredentials();
      if (!localId) {
         dispatch(actions.setLoading(false));
         return;
      }
      try {
         const userData = await authService.getUserData(localId);
         dispatch(actions.setCurrentUser(userData));
      } finally {
         dispatch(actions.setLoading(false));
      }
   },
};

export default authActions;
