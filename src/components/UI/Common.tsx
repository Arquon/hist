import React, { type FC } from "react";

import { type ICommonProps } from "@/types/ICommonProps";

export const Container: FC<ICommonProps> = ({ className, children }) => {
   const classes = ["container"];
   if (className !== undefined) classes.push(className);
   return <div className={classes.join(" ")}>{children}</div>;
};

export const NarrowContainer: FC<ICommonProps> = ({ className, children }) => {
   const classes = ["container", "container_narrow"];
   if (className !== undefined) classes.push(className);
   return <div className={classes.join(" ")}>{children}</div>;
};

export const AdditionalContainer: FC<ICommonProps> = ({ className, children }) => {
   const classes = ["additional__container"];
   if (className !== undefined) classes.push(className);
   return <NarrowContainer className={classes.join(" ")}>{children}</NarrowContainer>;
};
