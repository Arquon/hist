import { authService, type RegistrationData, type AuthData } from "@/services/http/auth.service";
import { localStorageService } from "@/services/localStorage.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AppActionType } from "../store";
import { actions } from "./slice";
import { type Nullable } from "@/types/common";
import { type UserData } from "@/types/user";
import { thunkErrorHandler } from "@/services/errors/thunk";

const signIn = createAsyncThunk<UserData, AuthData, { rejectValue: unknown }>(
   "auth/signIn",
   async function (authData, { rejectWithValue }) {
      try {
         const data = await authService.signIn(authData);
         localStorageService.setCredentials(data);
         const userData = await authService.getUserData(data.localId);
         return userData;
      } catch (error: unknown) {
         return rejectWithValue(thunkErrorHandler(error));
      }
   }
);

const signUp = createAsyncThunk<UserData, RegistrationData, { rejectValue: unknown }>(
   "auth/signUp",
   async function (registrationData, { rejectWithValue }) {
      try {
         const data = await authService.registration(registrationData);
         localStorageService.setCredentials(data);
         const userData = await authService.createUser(
            { email: registrationData.email, isAdmin: registrationData.isAdmin },
            data.localId
         );
         return userData;
      } catch (error: unknown) {
         return rejectWithValue(thunkErrorHandler(error));
      }
   }
);

const getCurrentUserData = createAsyncThunk<Nullable<UserData>, undefined, { rejectValue: unknown }>(
   "auth/getUserData",
   async function (_, { rejectWithValue }) {
      try {
         const { localId } = localStorageService.getCredentials();
         if (localId === null) return null;
         const userData = await authService.getUserData(localId);
         return userData;
      } catch (error: unknown) {
         return rejectWithValue(thunkErrorHandler(error));
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
