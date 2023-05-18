import React, { type FC } from "react";
import { EmptyLogo } from "./app/EmptyLogo";
import { Outlet } from "react-router-dom";

interface Props {}

export const EmptyLayout: FC<Props> = ({}) => {
   return (
      <div className="empty">
         <div className="empty__content">
            <EmptyLogo />
            <Outlet />
         </div>
      </div>
   );
};
