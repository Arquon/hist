import { AdditionalContainer } from "@/components/UI/Common";
import { ContentBlock } from "@/components/UI/content/ContentBlock";
import React, { type FC } from "react";
import stone from "@/assets/images/stone.png";
import { ContentItem } from "@/components/UI/content/ContentItem";

const firstBlock = {
   text: [
      <p>
         Масо&#769;нство (франкмасо&#769;нство, фр. Franc-ma&ccedil;onnerie, англ. Freemasonry)&nbsp;&mdash; движение,
         появившееся в&nbsp;виде тайного общества[1], которое берёт своё начало из&nbsp;малоизвестных истоков
         в&nbsp;конце XVI&nbsp;&mdash; начале XVII&nbsp;века. Основной версией происхождения масонства считается версия
         о&nbsp;происхождении от&nbsp;средневековых строительных гильдий каменщиков, однако существуют теории
         о&nbsp;более древнем происхождении масонства, начало которого выводится от&nbsp;орденов тамплиеров
         или&nbsp;&mdash; в&nbsp;других версиях&nbsp;&mdash; от&nbsp;ордена розенкрейцеров[2][3]. Название
         &laquo;масон&raquo; или &laquo;франкмасон&raquo; происходит от&nbsp;фр. franc-ma&ccedil;on
         (в&nbsp;старофранцузском masson, англ. freemason), употребляется также буквальный перевод этого
         названия&nbsp;&mdash; вольный каменщик[4].
      </p>,
      <p>
         Этика и&nbsp;философия масонства опираются на&nbsp;монотеистические религии, на&nbsp;древние конституции
         вольных каменщиков, их&nbsp;регламенты, статуты и&nbsp;уложения. Масонство символически использует инструменты
         строительных товариществ и&nbsp;легенды о&nbsp;строительстве Храма Соломона, чтобы выражать
         метафорически&nbsp;то, что и&nbsp;масонами, и&nbsp;их&nbsp;критиками описывается как &quot;система морали,
         скрытая в&nbsp;аллегориях и&nbsp;проиллюстрированная символами&laquo;[5][6].
      </p>,
      <p>
         Масонство административно организовано в&nbsp;суверенные великие ложи (в&nbsp;некоторых странах&nbsp;&mdash;
         &laquo;великий восток&raquo;), каждая из&nbsp;которых руководит масонскими ложами в&nbsp;границах собственной
         юрисдикции. Численность лож, как правило, варьируется от&nbsp;15&nbsp;до&nbsp;200&nbsp;человек, объединённых
         территориально. Местные ложи учреждаются великой ложей, которая в&nbsp;одной стране существует только одна.
         Некоторые великие ложи признают друг друга, некоторые&nbsp;&mdash; нет, в&nbsp;зависимости от&nbsp;следования
         древним масонским правилам[4][7]. Существуют также организации дополнительных степеней, в&nbsp;которых состоят
         члены символических масонских лож и&nbsp;которые обладают собственными независимыми органами управления. Однако
         в&nbsp;некоторых масонских организациях символические ложи могут быть подчинены управляющим органам этих
         дополнительных организаций[4].
      </p>,
      <p>
         Сейчас масонство распространено по&nbsp;всему миру и&nbsp;представлено в&nbsp;различных организационных формах:
         ложах, великих ложах, верховных советах, капитулах, ареопагах, консисториях, федерациях и&nbsp;конфедерациях.
         Общая численность масонов в&nbsp;мире оценивается в&nbsp;4&nbsp;000&nbsp;000 человек
      </p>,
   ],
   img: {
      src: stone,
      sign: "Подпись к рисунку",
   },
};

const secondBlock = firstBlock;

export const Freemasonry: FC = () => {
   return (
      <section className="freemasonry-page additional__page">
         <AdditionalContainer className="freemasonry-page__container">
            <ContentBlock heading="что такое масонство?" className="freemasonry-page__content-block">
               <ContentItem img={firstBlock.img}>
                  {firstBlock.text.map((textItem, index) =>
                     React.cloneElement(textItem, { ...textItem.props, key: index })
                  )}
               </ContentItem>
            </ContentBlock>
            <ContentBlock heading="из истории масонства" className="freemasonry-page__content-block">
               <ContentItem>
                  {secondBlock.text.map((textItem, index) =>
                     React.cloneElement(textItem, { ...textItem.props, key: index })
                  )}
               </ContentItem>
            </ContentBlock>
         </AdditionalContainer>
      </section>
   );
};
