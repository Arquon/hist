import React, { type FC } from "react";

import { Container } from "../UI/Common";
import { Appeal } from "./Appeal";
import { NewsSection } from "./News";
import { Gallery } from "./Gallery";
import { useMatchMedia } from "@/hooks/useMatchMedia";

export const InfoSection: FC = ({}) => {
   const { isMobile } = useMatchMedia();

   return (
      <section className="info">
         <Container className="info__container">
            <div className="info__row">
               <Appeal className="info__appeal" />
               {isMobile && <Gallery className="info__gallery" />}
               <NewsSection className="info__news" />
            </div>
         </Container>
      </section>
   );
};
