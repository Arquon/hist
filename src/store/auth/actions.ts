import { authService, type IRegistrationData, type IAuthData } from "@/services/auth.service";
import { localStorageService } from "@/services/localStorage.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   signInNetworkErrorsHandler,
   signUpNetworkErrorsHandler,
   userNetworkErrorsHandler,
} from "@/utils/errorHandlers";
import { type ValidationErrors } from "@/types/errorsTypes";
import { type IUserData } from "@/types/IUserData";
import { type AppActionType } from "../store";
import { actions } from "./slice";
import { type Nullable } from "@/types/default";

const signIn = createAsyncThunk<IUserData, IAuthData, { rejectValue: string | ValidationErrors<IAuthData> }>(
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

const signUp = createAsyncThunk<IUserData, IRegistrationData, { rejectValue: string | ValidationErrors<IAuthData> }>(
   "auth/signUp",
   async function (registrationData, { rejectWithValue }) {
      try {
         const data = await authService.registration(registrationData);
         localStorageService.setCredentials(data);
         const userData = await authService.createUser(registrationData, data.localId);
         return userData;
      } catch (error: unknown) {
         const parsedError = signUpNetworkErrorsHandler(error);
         return rejectWithValue(parsedError);
      }
   }
);

const getCurrentUserData = createAsyncThunk<Nullable<IUserData>, undefined, { rejectValue: string }>(
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
