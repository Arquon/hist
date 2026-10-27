import { type CommonProps } from "@/types/common";
import { getClassName } from "@/utils/functions";
import React from "react";

interface ContentTextProps extends CommonProps {}

export const ContentText = ({ className: propsClassName, children }: ContentTextProps) => {
   const className = getClassName({
      initialClassName: "content-block__text",
      className: propsClassName,
   });

   return <p className={className}>{children}</p>;
};
