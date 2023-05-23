import React, { Suspense, type FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { classesFromArray } from "@/utils/functions";
import { Loader } from "@/components/UI/Loader";

export const MainLayout: FC = () => {
   const location = useLocation();
   const classes: string[] = [];

   if (location.pathname !== "/") classes.push("additional");

   return (
      <>
         <Header />
         <main className={classesFromArray(classes)}>
            <Suspense fallback={<Loader />}>
               <Outlet />
            </Suspense>
         </main>
         <Footer />
      </>
   );
};
