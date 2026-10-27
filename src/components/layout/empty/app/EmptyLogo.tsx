import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";

interface Props {}

export const EmptyLogo = ({}: Props) => {
   return (
      <div className="empty__logo">
         <Link to="/">
            <img src={logo} />
         </Link>
      </div>
   );
};
