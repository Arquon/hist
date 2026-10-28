import { useIsAuth } from "@/hooks/auth/useIsAuth";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface WithoutAuthRequireProps {
   children: ReactNode;
}

export const WithoutAuthRequire = ({ children }: WithoutAuthRequireProps) => {
   const { isAuth } = useIsAuth();

   if (!isAuth) return children;
   else return <Navigate to={"/"} />;
};
