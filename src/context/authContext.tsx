import React, { type FC, useContext, useState, useEffect } from "react";
import { type Nullable } from "@/types/default";
import { type ICommonProps } from "@/types/ICommonProps";
import { type IRegistrationData, type IAuthData, authService } from "@/services/auth.service";
import axios from "axios";
import { localStorageService } from "@/services/localStorage.service";
import { type IUserData } from "@/types/IUserData";
import { type NetworkErrors } from "@/hooks/useErrors";
import { Loader } from "@/components/UI/Loader";

interface IAuthContext {
   isAuth: boolean;
   isAdmin: boolean;
   isLoadingUserData: boolean;
   error: Nullable<string>;
   signIn: (authData: IAuthData) => Promise<void>;
   signUp: (registrationData: IRegistrationData) => Promise<void>;
   signOut: () => void;
}

const defaultAuthContext: IAuthContext = {
   isAuth: false,
   isAdmin: false,
   isLoadingUserData: true,
   error: null,
   signIn: async function (): Promise<void> {
      throw new Error("Function not implemented.");
   },
   signOut: function (): void {
      throw new Error("Function not implemented.");
   },
   signUp: async function (): Promise<void> {
      throw new Error("Function not implemented.");
   },
};

const AuthContext = React.createContext<IAuthContext>(defaultAuthContext);

export const AuthProvider: FC<ICommonProps> = ({ children }) => {
   const [currentUser, setCurrentUser] = useState<Nullable<IUserData>>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<Nullable<string>>(null);

   const errorCatcher = (error: unknown): void => {
      if (axios.isAxiosError(error)) {
         setError(error.message);
         return;
      }
      setError("unhandled error");
   };

   async function signIn(authData: IAuthData): Promise<void> {
      try {
         const data = await authService.signIn(authData);
         localStorageService.setCredentials(data);
         const userData = await authService.getUserData(data.localId);
         setCurrentUser(userData);
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
   }

   async function signUp(registrationData: IRegistrationData): Promise<void> {
      try {
         const data = await authService.registration(registrationData);
         localStorageService.setCredentials(data);
         const userData = await authService.createUser(registrationData, data.localId);
         setCurrentUser(userData);
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
   }

   const signOut = (): void => {
      setCurrentUser(null);
      localStorageService.removeCredentials();
   };

   async function getUserData(localId: string): Promise<IUserData> {
      try {
         const userData = await authService.getUserData(localId);
         return userData;
      } catch (e) {
         errorCatcher(e);
         throw e;
      }
   }

   async function getCurrentUserData(localId: string): Promise<void> {
      const userData = await getUserData(localId);
      setCurrentUser(userData);
      setIsLoading(false);
   }

   useEffect(() => {
      const { localId } = localStorageService.getCredentials();
      if (localId) {
         getCurrentUserData(localId);
      } else setIsLoading(false);
   }, []);

   return (
      <AuthContext.Provider
         value={{
            isAuth: !!currentUser,
            isAdmin: !!currentUser?.isAdmin,
            error,
            isLoadingUserData: isLoading,
            signIn,
            signOut,
            signUp,
         }}
      >
         {!isLoading ? children : <Loader size={400} className="loader_b" />}
      </AuthContext.Provider>
   );
};

export function useAuth(): IAuthContext {
   return useContext(AuthContext);
}
