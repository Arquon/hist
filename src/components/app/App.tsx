import React from "react";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, newsRoutes, routes } from "@/router/router";
import { Layout } from "../layout/Layout";
import { CurrentWidthProvider } from "@/context/currentWidthContext";
import { NewsContextProvider } from "@/context/newsContext";
import { AuthProvider } from "@/context/authContext";

export const App: React.FC = () => {
   return (
      <>
         <CurrentWidthProvider>
            <AuthProvider>
               <div className="wrap">
                  <Routes>
                     <Route path="/" element={<Layout />}>
                        {routes.map(({ path, Element, name }) => (
                           <Route path={path} element={<Element />} key={name} />
                        ))}
                     </Route>
                     <Route
                        element={
                           <NewsContextProvider>
                              <Layout />
                           </NewsContextProvider>
                        }
                     >
                        {newsRoutes.map(({ path, Element, name }) => (
                           <Route path={path} element={<Element />} key={name} />
                        ))}
                     </Route>
                     {authRoutes.map(({ path, Element, name }) => (
                        <Route path={path} element={<Element />} key={name} />
                     ))}
                     <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
               </div>
            </AuthProvider>
         </CurrentWidthProvider>
         <ToastContainer />
      </>
   );
};
