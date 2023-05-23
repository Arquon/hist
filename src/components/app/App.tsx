import React from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, newsRoutes, routes } from "@/router/router";
import { MainLayout } from "../layout/main/MainLayout";
import { NewsContextProvider } from "@/context/newsContext";
import { AuthProvider } from "@/context/authContext";
import { EmptyLayout } from "../layout/empty/EmptyLayout";

export const App: React.FC = () => {
   return (
      <>
         <AuthProvider>
            <div className="wrap">
               <Routes>
                  <Route path="/" element={<MainLayout />}>
                     {routes.map(({ path, Element, name }) => (
                        <Route path={path} element={<Element />} key={name} />
                     ))}
                  </Route>
                  <Route
                     element={
                        <NewsContextProvider>
                           <MainLayout />
                        </NewsContextProvider>
                     }
                  >
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
         </AuthProvider>
         <ToastContainer />
      </>
   );
};
