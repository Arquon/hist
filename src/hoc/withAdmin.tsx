import { useAuth } from "@/hooks/useAuth";
import React, { type FC } from "react";
import { Navigate } from "react-router-dom";

export function withAdmin(Element: FC, redirectPath: string = "/"): (props: any) => JSX.Element {
   return function (props: any) {
      const { isAdmin } = useAuth();
      if (isAdmin) return <Element {...props} />;
      return <Navigate to={redirectPath} />;
   };
}
