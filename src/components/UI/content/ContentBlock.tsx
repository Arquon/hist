import React, { type ReactNode } from "react";
import { Heading } from "../CommonHeadings";
import { getClassName } from "@/utils/functions";
import { type CommonProps } from "@/types/common";

interface ContentBlockProps extends CommonProps {
   heading?: ReactNode;
}

export const ContentBlock = ({ heading, className, children }: ContentBlockProps) => {
   const contentBlockClassName = getClassName({ initialClassName: "content-block", className });

   return (
      <div className={contentBlockClassName}>
         {heading && <Heading className="content-block__heading">{heading}</Heading>}
         {children}
      </div>
   );
};
