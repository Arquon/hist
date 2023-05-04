import React, { type FC } from "react";

import { Container } from "../UI/Common";
import bannerImg from "@/assets/images/banner.png";
import { GalleryContainer } from "./Gallery";
import { useCurrentWidth } from "@/context/currentWidthContext";

export const StartScreenSection: FC = ({}) => {
   const { currentWidth } = useCurrentWidth();

   return (
      <section className="start">
         <div className="start__banner banner-start">
            <Container className="banner-start__container">
               <div className="banner-start__content">
                  <h1 className="banner-start__heading">Достопочтенная Ложа “Москва” №6018</h1>
                  <p className="banner-start__notice">Великий Восток Франции</p>
               </div>
            </Container>
            <div className="banner-start__bg">
               <img src={bannerImg} alt="" />
            </div>
         </div>
         {currentWidth > 1024 && <GalleryContainer className="start__gallery" />}
      </section>
   );
};
