import React, { type ReactNode } from "react";

interface ContentImage {
   src: string;
   sign: string;
}

interface ContentItemProps {
   heading?: string;
   img?: ContentImage;
   children: ReactNode;
}

export const ContentItem = ({ img, children }: ContentItemProps) => {
   return (
      <div className="content-block__item">
         <div className="content-block__content">{children}</div>
         {img && (
            <div className="content-block__img">
               <img src={img.src} alt="" />
               <p>{img.sign}</p>
            </div>
         )}
      </div>
   );
};
