import { type CustomLinkProps } from "@/types/common";
import React from "react";
import { Link } from "react-router-dom";

export const CustomLink = ({ children, to, className, onClick }: CustomLinkProps) => (
   <Link to={to} className={className} onClick={onClick}>
      {children}
   </Link>
);

export const ButtonLink = ({ children, to, className, onClick }: CustomLinkProps) => {
   const classes = ["btn"];
   if (className !== undefined) classes.push(className);
   return (
      <Link to={to} className={classes.join(" ")} onClick={onClick}>
         {children}
      </Link>
   );
};
