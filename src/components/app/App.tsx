import { routes } from "@/router/router";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { CurrentWidthProvider } from "@/context/currentWidthContext";

export const App: React.FC = () => {
   const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);

   window.addEventListener("resize", () => setCurrentWidth(window.innerWidth));

   return (
      <CurrentWidthProvider value={{ currentWidth }}>
         <div className="wrap">
            <Routes>
               <Route path="/" element={<Layout />}>
                  {routes.map(({ path, Element, name }) => (
                     <Route path={path} element={<Element />} key={name} />
                  ))}
               </Route>
            </Routes>
         </div>
      </CurrentWidthProvider>
   );
};
