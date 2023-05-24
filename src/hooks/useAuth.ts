import { type IAuthData, type IRegistrationData } from "@/services/auth.service";
import authActions from "@/store/auth/actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

interface UseAuth {
   isAuth: boolean;
   isAdmin: boolean;
   isLoadingUserData: boolean;
   signIn: (authData: IAuthData) => Promise<void>;
   signUp: (registrationData: IRegistrationData) => Promise<void>;
   signOut: () => void;
}

export function useAuth(): UseAuth {
   const { currentUser, isLoading } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   async function signIn(authData: IAuthData): Promise<void> {
      dispatch(authActions.signIn(authData));
   }

   async function signUp(registrationData: IRegistrationData): Promise<void> {
      dispatch(authActions.signUp(registrationData));
   }

   function signOut(): void {
      dispatch(authActions.signOut());
   }

   useEffect(() => {
      if (isLoading) dispatch(authActions.getCurrentUserData());
   }, []);

   return {
      isAuth: !!currentUser,
      isAdmin: !!currentUser?.isAdmin,
      isLoadingUserData: isLoading,
      signIn,
      signUp,
      signOut,
   };
}
