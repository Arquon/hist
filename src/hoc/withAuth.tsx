import { useAuth } from "@/hooks/useAuth";
import { type ICommonProps } from "@/types/ICommonProps";
import React, { type ReactElement, type FC, type ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute: FC<ICommonProps> = ({ children }) => {
   const { isAuth } = useAuth();

   if (isAuth) return children as ReactElement;
   else return <Navigate to={"/login"} />;
};

export function withAuth<T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) {
   return function (props: T) {
      const location = useLocation();
      const { isAuth } = useAuth();
      if (isAuth) return <Component {...props} />;
      return <Navigate to={"/login"} state={{ from: location }} replace />;
   };
}
