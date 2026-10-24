import { useAuth } from "@/hooks/useAuth";
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthRequireProps {
   children: ReactNode;
}

export const AuthRequire = ({ children }: AuthRequireProps) => {
   const { isAuth } = useAuth();

   if (isAuth) return children;
   else return <Navigate to={"/login"} />;
};
