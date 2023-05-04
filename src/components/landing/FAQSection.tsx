import React, { type FC } from "react";
import { Container } from "../UI/Common";
import faqBanner from "@/assets/images/faq_banner.png";
import { ButtonLink } from "../UI/CustomLink";

interface Props {}

export const FAQSection: FC<Props> = ({}) => {
   return (
      <section className="faq">
         <div className="faq__banner">
            <Container className="faq__container">
               <div className="faq__content">
                  <h3 className="faq__heading">часто задаваемые вопросы</h3>
                  <p className="faq__text">
                     Прежде, чем подавать прошение о вступлении, следует убедиться, что вы правильно понимаете, чем является масонство и чем оно не является. Для ответа на эти вопросы мы подготовили
                     эту статью.
                  </p>
                  <ButtonLink to="/faq">Подробнее</ButtonLink>
               </div>
            </Container>
            <div className="faq__bg">
               <img src={faqBanner} alt="" />
            </div>
         </div>
      </section>
   );
};
