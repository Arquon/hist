import { type ICommonProps } from "@/types/ICommonProps";
import React, { type FC } from "react";
import { Container } from "../UI/Common";
import { GalleryItem } from "./GalleryItem";
import freemasonryImg from "@/assets/images/freemasonry.png";
import marianneImg from "@/assets/images/marianne.png";
import moscowMedalImg from "@/assets/images/moscou_medaille.png";

export const GalleryContainer: FC<ICommonProps> = ({ children, className }) => {
   const classes = ["gallery"];

   if (className !== undefined) classes.push(className);
   return (
      <div className={classes.join(" ")}>
         <Container className="gallery__container">
            <div className="gallery__row">
               <GalleryItem img={freemasonryImg} text="Что такое Масонство?" />
               <GalleryItem img={marianneImg} text="Великий Восток Франции" />
               <GalleryItem img={moscowMedalImg} text={<>Д:. Л:. “Москва” №&nbsp;6018</>} />
            </div>
         </Container>
      </div>
   );
};

export const Gallery: FC<ICommonProps> = ({ children, className }) => {
   const classes = ["gallery"];

   if (className !== undefined) classes.push(className);
   return (
      <div className={classes.join(" ")}>
         <div className="gallery__row">
            <GalleryItem img={freemasonryImg} text="Что такое Масонство?" />
            <GalleryItem img={marianneImg} text="Великий Восток Франции" />
            <GalleryItem img={moscowMedalImg} text={<>Д:. Л:. “Москва” №&nbsp;6018</>} />
         </div>
      </div>
   );
};
