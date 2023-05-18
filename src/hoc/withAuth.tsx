import { useAuth } from "@/context/authContext";
import { type ICommonProps } from "@/types/ICommonProps";
import React, { type ReactElement, type FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FC<ICommonProps> = ({ children }) => {
   const { isAuth } = useAuth();

   if (isAuth) return children as ReactElement;
   else return <Navigate to={"/login"} />;
};

export function withAuth(Element: FC): (props: any) => JSX.Element {
   return function (props: any) {
      const location = useLocation();
      const { isAuth } = useAuth();
      if (isAuth) return <Element {...props} />;
      return <Navigate to={"/login"} state={{ from: location }} replace />;
   };
}
