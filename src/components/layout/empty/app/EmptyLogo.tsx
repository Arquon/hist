import React, { type FC } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";

interface Props {}

export const EmptyLogo: FC<Props> = () => {
   return (
      <div className="empty__logo">
         <Link to="/">
            <img src={logo} />
         </Link>
      </div>
   );
};
