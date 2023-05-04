import { type ICustomLinkProps } from "@/types/ICommonProps";
import React, { type FC } from "react";
import { Link } from "react-router-dom";

export const CustomLink: FC<ICustomLinkProps> = ({ children, to, className, onClick }) => (
   <Link to={to} className={className} onClick={onClick}>
      {children}
   </Link>
);

export const ButtonLink: FC<ICustomLinkProps> = ({ children, to, className, onClick }) => {
   const classes = ["btn"];
   if (className !== undefined) classes.push(className);
   return (
      <Link to={to} className={classes.join(" ")} onClick={onClick}>
         {children}
      </Link>
   );
};
