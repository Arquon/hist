import React from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, newsRoutes, routes } from "@/router/router";
import { MainLayout } from "../layout/main/MainLayout";
import { EmptyLayout } from "../layout/empty/EmptyLayout";
import { useAuth } from "@/hooks/useAuth";

export const App: React.FC = () => {
   const { isLoadingUserData } = useAuth();

   if (isLoadingUserData) return null;

   return (
      <>
         <div className="wrap">
            <Routes>
               <Route path="/" element={<MainLayout />}>
                  {routes.map(({ path, Element, name }) => (
                     <Route path={path} element={<Element />} key={name} />
                  ))}
               </Route>
               <Route element={<MainLayout />}>
                  {newsRoutes.map(({ path, Element, name }) => (
                     <Route path={path} element={<Element />} key={name} />
                  ))}
               </Route>
               {authRoutes.map(({ path, Element, name }) => (
                  <Route element={<EmptyLayout />} key={name}>
                     <Route path={path} element={<Element />} key={name} />
                  </Route>
               ))}
               <Route path="*" element={<Navigate to="/" />} />
            </Routes>
         </div>
         <ToastContainer />
      </>
   );
};
