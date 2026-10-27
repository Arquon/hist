import { AdditionalContainer } from "@/components/UI/Common";
import { ContentBlock } from "@/components/UI/content/ContentBlock";
import { ContentItem } from "@/components/UI/content/ContentItem";
import { ContentText } from "@/components/UI/content/ContentText";
import React from "react";

export const Moscow = () => {
   return (
      <section className="moscow-page additional__page">
         <AdditionalContainer className="moscow-page__container">
            <ContentBlock heading="Достопочтенная ложа Москва №6018">
               <ContentItem>
                  <ContentText>
                     Ложа &laquo;Москва&raquo; была основана в&nbsp;1997&nbsp;г. несколькими русскими Братьями Великого
                     Востока Франции. На&nbsp;тот момент, российское либеральное Масонство проходило через некоторый
                     кризис, выходом из&nbsp;которого и&nbsp;явилось рождение нашей Ложи.
                  </ContentText>

                  <ContentText>
                     Несколько российских Лож Великого Востока Франции покинуло это послушание в&nbsp;конце
                     XX&nbsp;века, а&nbsp;российское либеральное Масонство, которое было основано после почти
                     восьмидесятилетнего перерыва весной 1991&nbsp;г. Великим Востоком Франции, потеряло немало Братьев.
                     В&nbsp;то&nbsp;время четыре существовавшие Ложи Великого Востока Франции оказались слишком
                     малочисленными, и&nbsp;было решено основать вместо них одну, а&nbsp;затем две Ложи (Ложа
                     &laquo;Москва&raquo; и&nbsp;Ложа &laquo;Северная Звезда&raquo;). В&nbsp;2006&nbsp;г., Братья второй
                     из&nbsp;этих Лож присоединились к&nbsp;работе Ложи &laquo;Москва&raquo;, которая долгое время
                     являлась единственной российской Ложей Великого Востока Франции.
                  </ContentText>

                  <ContentText>
                     8&nbsp;июня 2013 года ВВФ создал в&nbsp;России ещё одну Ложу&nbsp;&mdash; Ложу &laquo;Астрея&raquo;
                     в&nbsp;Санкт-Петербурге. Она имеет номер 6032&nbsp;в реестрах Великого Востока Франции.
                  </ContentText>

                  <ContentText>
                     За&nbsp;более чем десятилетний период своей работы, Ложа пополнилась многими Вольными Каменщиками,
                     обрела устойчивость, работает на&nbsp;двух языках (русском и&nbsp;французском), часто принимает
                     Братьев и&nbsp;Сестёр из&nbsp;Великого Востока Франции и&nbsp;многих других послушаний.
                  </ContentText>

                  <ContentText>
                     Ложа и&nbsp;в&nbsp;будущем надеется нести Свет Масонства в&nbsp;России, работая во&nbsp;славу
                     идеалов терпимости и&nbsp;братства, которые вот уже почти 300 лет являются основой Великого Востока
                     Франции. В&nbsp;мире, где догмы, нетерпимость, расизм, косность и&nbsp;эгоизм увы, всё встречаются
                     всё чаще и&nbsp;чаще, мы&nbsp;продолжим работать, согласно традициям нашего Ордена, для наступления
                     эры лучшего и&nbsp;более просвещённого человечества.
                  </ContentText>
               </ContentItem>
            </ContentBlock>
         </AdditionalContainer>
      </section>
   );
};

export default Moscow;
