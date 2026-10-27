import React, { type ReactNode } from "react";

interface GalleryItemProps {
   img: string;
   text: ReactNode;
}

export const GalleryItem = ({ img, text }: GalleryItemProps) => (
   <div className="gallery__item gallery-item">
      <div className="gallery-item__img">
         <img src={img} alt="" />
      </div>
      <div className="gallery-item__text">{text}</div>
   </div>
);
