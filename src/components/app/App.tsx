import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "@/router/router";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAppDispatch } from "@/store/store";
import authActions from "@/store/auth/actions";
import { useIsAuth } from "@/hooks/auth/useIsAuth";

export const App: React.FC = () => {
   const { isLoadingUserData } = useIsAuth();
   const dispatch = useAppDispatch();

   useScrollToTop();
   const routes = useRoutes(appRoutes);

   useEffect(() => {
      dispatch(authActions.getCurrentUserData());
   }, [dispatch]);

   if (isLoadingUserData) return null;

   return (
      <>
         <div className="wrap">{routes}</div>
         <ToastContainer />
      </>
   );
};
