import React, { type FC, useContext, useState } from "react";
import { type ICommonProps } from "@/types/ICommonProps";

interface ICurrenWidthContext {
   currentWidth: number;
}

export const CurrentWidthContext = React.createContext<ICurrenWidthContext>({
   currentWidth: 0,
});

export const CurrentWidthProvider: FC<ICommonProps> = ({ children }) => {
   const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);
   window.addEventListener("resize", () => setCurrentWidth(window.innerWidth));
   return (
      <CurrentWidthContext.Provider value={{ currentWidth }}>
         {children}
      </CurrentWidthContext.Provider>
   );
};

export function useCurrentWidth(): ICurrenWidthContext {
   return useContext(CurrentWidthContext);
}
