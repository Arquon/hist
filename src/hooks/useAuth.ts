import { type IAuthData, type IRegistrationData } from "@/services/auth.service";
import authActions from "@/store/auth/actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";

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

   const errorHandler = (error: unknown): void => {
      if (typeof error === "string") toast(error);
      throw error;
   };

   async function signIn(authData: IAuthData): Promise<void> {
      try {
         unwrapResult(await dispatch(authActions.signIn(authData)));
      } catch (error: unknown) {
         errorHandler(error);
      }
   }

   async function signUp(registrationData: IRegistrationData): Promise<void> {
      try {
         unwrapResult(await dispatch(authActions.signUp(registrationData)));
      } catch (error: unknown) {
         errorHandler(error);
      }
   }

   function signOut(): void {
      dispatch(authActions.signOut());
   }

   async function getCurrentUserData(): Promise<void> {
      await dispatch(authActions.getCurrentUserData());
   }

   useEffect(() => {
      if (isLoading) getCurrentUserData();
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
