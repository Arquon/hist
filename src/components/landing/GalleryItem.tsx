import React, { type FC } from "react";

interface IGalleryItemProps {
   img: string;
   text: JSX.Element | string;
}

export const GalleryItem: FC<IGalleryItemProps> = ({ img, text }) => (
   <div className="gallery__item gallery-item">
      <div className="gallery-item__img">
         <img src={img} alt="" />
      </div>
      <div className="gallery-item__text">{text}</div>
   </div>
);
