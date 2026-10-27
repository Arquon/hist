import { type CommonProps } from "@/types/common";
import React from "react";

export const Container = ({ className, children }: CommonProps) => {
   const classes = ["container"];
   if (className !== undefined) classes.push(className);
   return <div className={classes.join(" ")}>{children}</div>;
};

export const NarrowContainer = ({ className, children }: CommonProps) => {
   const classes = ["container", "container_narrow"];
   if (className !== undefined) classes.push(className);
   return <div className={classes.join(" ")}>{children}</div>;
};

export const AdditionalContainer = ({ className, children }: CommonProps) => {
   const classes = ["additional__container"];
   if (className !== undefined) classes.push(className);
   return <NarrowContainer className={classes.join(" ")}>{children}</NarrowContainer>;
};
