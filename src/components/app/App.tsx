import React from "react";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "@/router/router";
import { useAuth } from "@/hooks/useAuth";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export const App: React.FC = () => {
   const { isLoadingUserData } = useAuth();

   useScrollToTop();
   const routes = useRoutes(appRoutes);

   if (isLoadingUserData) return null;

   return (
      <>
         <div className="wrap">{routes}</div>
         <ToastContainer />
      </>
   );
};
