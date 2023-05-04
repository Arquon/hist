import React, { type FC } from "react";
import { Container } from "../UI/Common";

import freemasonryBanner from "@/assets/images/freemasonry_banner.png";
import { ButtonLink } from "../UI/CustomLink";

interface Props {}

export const FreemasonrySection: FC<Props> = ({}) => {
   return (
      <section className="freemasonry">
         <div className="freemasonry__banner">
            <Container className="freemasonry__container">
               <div className="freemasonry__content">
                  <div>
                     <h3 className="freemasonry__heading">Вступление в масонство</h3>
                     <p className="freemasonry__text">
                        Вступить в масонство, с одной стороны, весьма просто, а с другой - фактически невозможно. Больше подробностей вы узнаете из нашей статьи для кандидатов.
                     </p>
                     <ButtonLink to="/freemasonry">Подробнее</ButtonLink>
                  </div>
               </div>
            </Container>

            <div className="freemasonry__bg">
               <img src={freemasonryBanner} alt="" />
            </div>
         </div>
      </section>
   );
};
