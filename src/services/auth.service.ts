import { type IUserCredentials } from "@/types/IUserCredentials";
import { type IUserData } from "@/types/IUserData";
import axios from "axios";
import httpService from "./http.service";

const authHttpService = axios.create({
   baseURL: "https://identitytoolkit.googleapis.com/v1/",
   params: {
      key: process.env.REACT_APP_FIREBASE_KEY,
   },
});

export interface IAuthData {
   email: string;
   password: string;
}

export interface IRegistrationData extends IAuthData {
   isAdmin: boolean;
}

interface IAuthResponse extends IUserCredentials {
   isRegistered: boolean;
}

interface IRefreshResponse {
   expires_in: string;
   refresh_token: string;
   id_token: string;
   user_id: string;
}

const usersEndPoint = "users/";

export const authService = {
   registration: async (registrationData: IRegistrationData) => {
      const { data } = await authHttpService.post<IUserCredentials>("accounts:signUp", {
         ...registrationData,
         returnSecureToken: true,
      });
      return data;
   },
   signIn: async (loginData: IAuthData) => {
      const { data } = await authHttpService.post<IAuthResponse>("accounts:signInWithPassword", {
         ...loginData,
         returnSecureToken: true,
      });
      return data;
   },
   refreshToken: async (refreshToken: string): Promise<IUserCredentials> => {
      const { data } = await authHttpService.post<IRefreshResponse>("token", {
         grant_type: "refresh_token",
         refresh_token: refreshToken,
      });
      return {
         expiresIn: Number(data.expires_in),
         idToken: data.id_token,
         localId: data.user_id,
         refreshToken: data.refresh_token,
      };
   },
   createUser: async (userData: IUserData, id: string) => {
      const { data } = await httpService.put<IUserData>(usersEndPoint + id + "/", { ...userData, id });
      return data;
   },
   getUserData: async (userId: string) => {
      const { data } = await httpService.get<IUserData>(usersEndPoint + userId + "/");
      return data;
   },
};
