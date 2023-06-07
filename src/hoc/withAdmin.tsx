import { useAuth } from "@/hooks/useAuth";
import React, { type ComponentType } from "react";
import { Navigate } from "react-router-dom";

export function withAdmin<T extends JSX.IntrinsicAttributes>(
   HOCComponent: ComponentType<T>,
   redirectPath: string = "/"
) {
   return function (props: T) {
      const { isAdmin } = useAuth();
      if (isAdmin) {
         return <HOCComponent {...props} />;
      }
      return <Navigate to={redirectPath} />;
   };
}
