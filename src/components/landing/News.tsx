import React, { type FC } from "react";

import { type ICommonProps } from "@/types/ICommonProps";
import { ButtonLink } from "../UI/CustomLink";
import { LandingNewsItem } from "./LandingNewsItem";
import { useMatchMedia } from "@/hooks/useMatchMedia";

export const NewsSection: FC<ICommonProps> = ({ className }) => {
   const { isMobile } = useMatchMedia();

   const classes = ["news"];
   if (className !== undefined) classes.push(className);

   return (
      <div className={classes.join(" ")}>
         <h3 className="news__heading">
            {!isMobile && <br />}
            последние Новости
         </h3>
         <div className="news__row">
            <LandingNewsItem
               createdAt={new Date(2021, 5, 21).getTime()}
               title="Посещение работ Великого Востока"
               content="Вчера, 21 июня, состоялось торжественное посещение работ Великого Востока Бельгии в составе делегации Братьев Достопочтенных Лож “Москва” и “Астрея."
            />
            {!isMobile && (
               <LandingNewsItem
                  createdAt={new Date(2021, 5, 21).getTime()}
                  title="Посещение работ Великого Востока"
                  content="Вчера, 21 июня, состоялось торжественное посещение работ Великого Востока Бельгии в составе делегации Братьев Достопочтенных Лож “Москва” и “Астрея."
               />
            )}
         </div>
         <ButtonLink to="/news" className="news__btn">
            Все новости
         </ButtonLink>
      </div>
   );
};
