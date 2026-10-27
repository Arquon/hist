import { LocalStorageKeys } from "@/types/localStorage";

export const localStorageService = {
   setCredentials: ({
      idToken,
      refreshToken,
      expiresIn,
      localId,
   }: {
      idToken: string;
      refreshToken: string;
      expiresIn: number;
      localId: string;
   }) => {
      const expiresInTimestamp = String(Date.now() + expiresIn * 1000);
      localStorage.setItem(LocalStorageKeys.ID_TOKEN, idToken);
      localStorage.setItem(LocalStorageKeys.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(LocalStorageKeys.EXPIRES_IN, expiresInTimestamp);
      localStorage.setItem(LocalStorageKeys.LOCAL_ID, localId);
   },
   getCredentials: () => ({
      idToken: localStorage.getItem(LocalStorageKeys.ID_TOKEN),
      refreshToken: localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN),
      expiresIn: localStorage.getItem(LocalStorageKeys.EXPIRES_IN),
      localId: localStorage.getItem(LocalStorageKeys.LOCAL_ID),
   }),
   removeCredentials: () => {
      localStorage.removeItem(LocalStorageKeys.ID_TOKEN);
      localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
      localStorage.removeItem(LocalStorageKeys.EXPIRES_IN);
      localStorage.removeItem(LocalStorageKeys.LOCAL_ID);
   },
};
