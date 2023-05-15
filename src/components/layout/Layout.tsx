import React, { type FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import { classesFromArray } from "@/utils/functions";

export const Layout: FC = () => {
   const location = useLocation();
   const classes: string[] = [];

   if (location.pathname !== "/") classes.push("additional");

   return (
      <>
         <Header />
         <main className={classesFromArray(classes)}>
            <Outlet />
         </main>
         <Footer />
      </>
   );
};
