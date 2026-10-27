import { authService, type RegistrationData, type AuthData } from "@/services/auth.service";
import { localStorageService } from "@/services/localStorage.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   signInNetworkErrorsHandler,
   signUpNetworkErrorsHandler,
   userNetworkErrorsHandler,
} from "@/utils/errorHandlers";

import { type AppActionType } from "../store";
import { actions } from "./slice";
import { type ValidationErrors, type Nullable } from "@/types/common";
import { type UserData } from "@/types/user";

const signIn = createAsyncThunk<UserData, AuthData, { rejectValue: string | Partial<ValidationErrors<AuthData>> }>(
   "auth/signIn",
   async function (authData, { rejectWithValue }) {
      try {
         const data = await authService.signIn(authData);
         localStorageService.setCredentials(data);
         const userData = await authService.getUserData(data.localId);
         return userData;
      } catch (error: unknown) {
         const parsedError = signInNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const signUp = createAsyncThunk<
   UserData,
   RegistrationData,
   { rejectValue: string | Partial<ValidationErrors<AuthData>> }
>("auth/signUp", async function (registrationData, { rejectWithValue }) {
   try {
      const data = await authService.registration(registrationData);
      localStorageService.setCredentials(data);
      const userData = await authService.createUser(
         { email: registrationData.email, isAdmin: registrationData.isAdmin },
         data.localId
      );
      return userData;
   } catch (error: unknown) {
      const parsedError = signUpNetworkErrorsHandler(error);
      return rejectWithValue(parsedError);
   }
});

const getCurrentUserData = createAsyncThunk<Nullable<UserData>, undefined, { rejectValue: string }>(
   "auth/getUserData",
   async function (_, { rejectWithValue }) {
      try {
         const { localId } = localStorageService.getCredentials();
         if (localId === null) return null;
         const userData = await authService.getUserData(localId);
         return userData;
      } catch (error: unknown) {
         const stringError = userNetworkErrorsHandler(error);
         return rejectWithValue(stringError);
      }
   }
);

const signOut = (): AppActionType => (dispatch, getState) => {
   localStorageService.removeCredentials();
   dispatch(actions.signOut());
};

const authActions = {
   signIn,
   signUp,
   getCurrentUserData,
   signOut,
};

export { signIn, signUp, getCurrentUserData };
export default authActions;
