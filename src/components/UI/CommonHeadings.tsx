import React, { type FC } from "react";
import { type ICommonProps } from "@/types/ICommonProps";
import { getClassName } from "@/utils/functions";

export const Heading: FC<ICommonProps> = ({ className, children }) => {
   const computedClassName = getClassName({ className });
   return <h3 className={computedClassName}>{children}</h3>;
};
