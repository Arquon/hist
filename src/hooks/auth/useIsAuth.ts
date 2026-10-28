import { useAppSelector } from "@/store/store";

interface UseAuth {
   isAuth: boolean;
   isAdmin: boolean;
   isLoadingUserData: boolean;
}

export function useIsAuth(): UseAuth {
   const { currentUser, isLoading } = useAppSelector((state) => state.auth);

   return {
      isAuth: !!currentUser,
      isAdmin: !!currentUser?.isAdmin,
      isLoadingUserData: isLoading,
   };
}
