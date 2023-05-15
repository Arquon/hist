import { useAuth } from "@/context/authContext";
import { type ICommonProps } from "@/types/ICommonProps";
import React, { type ReactElement, type FC } from "react";
import { Navigate } from "react-router-dom";

export const TestRoute: FC<ICommonProps> = ({ children }) => {
   const { isAuth } = useAuth();

   if (!isAuth) return children as ReactElement;
   else return <Navigate to={"/"} />;
};

export function withoutAuth(Element: FC): (props: any) => JSX.Element {
   return function (props: any) {
      const { isAuth } = useAuth();
      if (!isAuth) return <Element {...props} />;
      return <Navigate to={"/"} />;
   };
}
