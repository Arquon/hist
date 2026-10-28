import { useIsAuth } from "@/hooks/auth/useIsAuth";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminRequireProps {
   children: ReactNode;
   redirectPath?: string;
}

export const AdminRequire = ({ children, redirectPath = "/" }: AdminRequireProps) => {
   const { isAdmin } = useIsAuth();

   if (isAdmin) {
      return children;
   }

   return <Navigate to={redirectPath} />;
};
