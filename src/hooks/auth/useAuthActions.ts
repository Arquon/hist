import { type AuthData, type RegistrationData } from "@/services/http/auth.service";
import authActions from "@/store/auth/actions";
import { useAppDispatch } from "@/store/store";
import { unwrapResult } from "@reduxjs/toolkit";

export function useAuthActions() {
   const dispatch = useAppDispatch();

   async function signIn(authData: AuthData) {
      unwrapResult(await dispatch(authActions.signIn(authData)));
   }

   async function signUp(registrationData: RegistrationData) {
      unwrapResult(await dispatch(authActions.signUp(registrationData)));
   }

   function signOut() {
      dispatch(authActions.signOut());
   }

   return {
      signIn,
      signUp,
      signOut,
   };
}
