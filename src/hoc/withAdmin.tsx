import { useAuth } from "@/hooks/useAuth";
import React, { type ReactNode, type ComponentType, type FC, type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface WithAdminProps {
   redirectPath?: string;
}

export const AdminRequire: FC<PropsWithChildren<WithAdminProps>> = ({ children, redirectPath = "/" }) => {
   const { isAdmin } = useAuth();

   if (isAdmin) {
      return <>{children}</>;
   }

   return <Navigate to={redirectPath} />;
};

export function withAdmin<T extends JSX.IntrinsicAttributes>(
   HOCComponent: ComponentType<T>,
   redirectPath: string = "/"
): (props: T) => ReactNode {
   return function (props: T) {
      const { isAdmin } = useAuth();
      if (isAdmin) {
         return <HOCComponent {...props} />;
      }
      return <Navigate to={redirectPath} />;
   };
}
