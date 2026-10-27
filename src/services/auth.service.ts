import axios from "axios";
import httpService from "./http.service";
import { type UserCredentials, type UserData } from "@/types/user";

const authHttpService = axios.create({
   baseURL: "https://identitytoolkit.googleapis.com/v1/",
   params: {
      key: process.env.REACT_APP_FIREBASE_KEY,
   },
});

export interface AuthData {
   email: string;
   password: string;
}

export interface RegistrationData extends AuthData {
   isAdmin: boolean;
}

interface AuthResponse extends UserCredentials {
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
   registration: async (registrationData: RegistrationData) => {
      const { data } = await authHttpService.post<UserCredentials>("accounts:signUp", {
         ...registrationData,
         returnSecureToken: true,
      });
      return data;
   },
   signIn: async (loginData: AuthData) => {
      const { data } = await authHttpService.post<AuthResponse>("accounts:signInWithPassword", {
         ...loginData,
         returnSecureToken: true,
      });
      return data;
   },
   refreshToken: async (refreshToken: string): Promise<UserCredentials> => {
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
   createUser: async (userData: UserData, id: string) => {
      const { data } = await httpService.put<UserData>(usersEndPoint + id + "/", { ...userData, id });
      return data;
   },
   getUserData: async (userId: string) => {
      const { data } = await httpService.get<UserData>(usersEndPoint + userId + "/");
      return data;
   },
};
