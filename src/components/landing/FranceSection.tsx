import React, { type FC } from "react";
import { Container } from "../UI/Common";
import { VideoItem } from "../UI/VideoItem";
import firstVideoPreview from "@/assets/images/first_video.png";
import secondVideoPreview from "@/assets/images/second_video.png";

interface Props {}

export const FranceSection: FC<Props> = ({}) => (
   <section className="france">
      <Container className="france__container">
         <div className="france__content">
            <h3 className="france__heading">видео о великом востоке франции</h3>
            <div className="france__row">
               <VideoItem source="https://www.youtube.com/embed/1u7WN2zBEDc" preview={firstVideoPreview} className="france__video" />
               <VideoItem source="https://www.youtube.com/embed/1u7WN2zBEDc" preview={secondVideoPreview} className="france__video" />
            </div>
         </div>
      </Container>
   </section>
);
