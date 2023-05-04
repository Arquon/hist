import React, { type FC, useContext } from "react";
import { type IProvider } from "@/types/IProvider";

interface ICurrenWidthContext {
   currentWidth: number;
}

export const CurrentWidthContext = React.createContext<ICurrenWidthContext>({ currentWidth: 0 });

export const CurrentWidthProvider: FC<IProvider<ICurrenWidthContext>> = ({ children, value }) => <CurrentWidthContext.Provider value={value}>{children}</CurrentWidthContext.Provider>;

export function useCurrentWidth(): ICurrenWidthContext {
   return useContext(CurrentWidthContext);
}
