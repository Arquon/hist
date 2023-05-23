import { type ICommonProps } from "@/types/ICommonProps";
import React, { type FC } from "react";
import { Heading } from "../CommonHeadings";
import { getClassName } from "@/utils/functions";

interface ContentBlockProps extends ICommonProps {
   heading?: string | JSX.Element;
}

export const ContentBlock: FC<ContentBlockProps> = ({ heading, className, children }) => {
   const contentBlockClassName = getClassName({ initialClassName: "content-block", className });

   return (
      <div className={contentBlockClassName}>
         {heading && <Heading className="content-block__heading">{heading}</Heading>}
         {children}
      </div>
   );
};
