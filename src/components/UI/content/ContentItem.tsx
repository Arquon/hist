import { getClassName } from "@/utils/functions";
import React from "react";

interface ContentImage {
   src: string;
   sign: string;
}

interface ContentItemProps {
   heading?: string;
   img?: ContentImage;
   children: JSX.Element[] | JSX.Element;
}

export const ContentItem = ({ img, children }: ContentItemProps) => {
   const clonedChildren = React.Children.map(children, (child) => {
      const type = typeof child.type;
      if (type === "string") {
         switch (child.type) {
            case "p":
               return React.cloneElement(child, {
                  ...child.props,
                  className: getClassName({
                     initialClassName: child.props.className,
                     className: "content-block__text",
                  }),
               });
            default:
               return child;
         }
      }
      return child;
   });

   return (
      <div className="content-block__item">
         <div className="content-block__content">{clonedChildren}</div>
         {img && (
            <div className="content-block__img">
               <img src={img.src} alt="" />
               <p>{img.sign}</p>
            </div>
         )}
      </div>
   );
};
