import { getClassName } from "@/utils/functions";
import React, { type FC } from "react";

interface IContentImage {
   src: string;
   sign: string;
}

interface ContentItemProps {
   heading?: string;
   img?: IContentImage;
   children: JSX.Element[] | JSX.Element;
}

export const ContentItem: FC<ContentItemProps> = ({ img, children }) => {
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
