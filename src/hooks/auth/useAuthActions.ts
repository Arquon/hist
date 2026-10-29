import { type AuthData, type RegistrationData } from "@/services/http/auth.service";
import authActions from "@/store/auth/actions";
import { useAppDispatch } from "@/store/store";

export function useAuthActions() {
   const dispatch = useAppDispatch();

   async function signIn(authData: AuthData) {
      return await dispatch(authActions.signIn(authData)).unwrap();
   }

   async function signUp(registrationData: RegistrationData) {
      return await dispatch(authActions.signUp(registrationData)).unwrap();
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
