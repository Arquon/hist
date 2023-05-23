import { AdditionalContainer } from "@/components/UI/Common";
import { ContentBlock } from "@/components/UI/content/ContentBlock";
import { ContentItem } from "@/components/UI/content/ContentItem";
import React, { type FC } from "react";

const firstBlock = {
   text: [
      <p>
         Наша Ложа работает в&nbsp;Москве. Великий Восток Франции пока не&nbsp;располагает мастерскими в&nbsp;регионах.
         Тем не&nbsp;менее, все&nbsp;те, кому близки наши идеалы и&nbsp;наша деятельность, откуда&nbsp;бы
         Вы&nbsp;ни&nbsp;были, могут писать на&nbsp;наш{" "}
         <a href="#" className="content-block__link">
            мэйл
         </a>
         .
      </p>,
      <p>
         Мы&nbsp;с&nbsp;удовольствием откликнемся на&nbsp;Вашу заинтересованность. По&nbsp;вполне понятным причинам,
         не&nbsp;представляется возможным разместить в&nbsp;сети наши телефоны, однако при наличии реального интереса
         присоединиться к&nbsp;нашей деятельности, довольно нетрудно вступить в&nbsp;контакт с&nbsp;нами. Существует{" "}
         <a className="content-block__link" href="#">
            последовательность действий
         </a>
         , которую надо будет выполнить, и&nbsp;затем мы&nbsp;сможем договориться о&nbsp;встрече.
      </p>,
      <p className="content-block__text_b">
         Наш мэйл:{" "}
         <a href="#" className="content-block__link content-block__link_e">
            mail@logemoscou.org.
         </a>
      </p>,
   ],
};

export const Contacts: FC = () => {
   return (
      <section className="contacts-page additional__page">
         <AdditionalContainer>
            <ContentBlock heading="контакты" className="contacts-page__content-block">
               <ContentItem>
                  {firstBlock.text.map((textItem, index) =>
                     React.cloneElement(textItem, { ...textItem.props, key: index })
                  )}
               </ContentItem>
            </ContentBlock>
         </AdditionalContainer>
      </section>
   );
};
