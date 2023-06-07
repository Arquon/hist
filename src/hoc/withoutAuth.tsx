import { useAuth } from "@/hooks/useAuth";
import { type ICommonProps } from "@/types/ICommonProps";
import React, { type ReactElement, type FC, type ComponentType } from "react";
import { Navigate } from "react-router-dom";

export const TestRoute: FC<ICommonProps> = ({ children }) => {
   const { isAuth } = useAuth();

   if (!isAuth) return children as ReactElement;
   else return <Navigate to={"/"} />;
};

export function withoutAuth<T extends JSX.IntrinsicAttributes>(Element: ComponentType<T>) {
   return function (props: T) {
      const { isAuth } = useAuth();
      if (!isAuth) return <Element {...props} />;
      return <Navigate to={"/"} />;
   };
}
