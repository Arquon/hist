import React from "react";
import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "@/router/router";
import { useAuth } from "@/hooks/useAuth";
import { useScrollToTop } from "@/hooks/useScrollToTop";

export const App: React.FC = () => {
   const { isLoadingUserData } = useAuth();
   useScrollToTop();
   if (isLoadingUserData) return null;

   const routes = useRoutes(appRoutes);

   return (
      <>
         <div className="wrap">{routes}</div>
         <ToastContainer />
      </>
   );
};
