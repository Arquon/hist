import React from "react";
import { getClassName } from "@/utils/functions";
import { type CommonProps } from "@/types/common";

export const Heading = ({ className, children }: CommonProps) => {
   const computedClassName = getClassName({ className });
   return <h3 className={computedClassName}>{children}</h3>;
};
