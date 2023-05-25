import React, { useEffect, type FC, useState } from "react";

import { type ICommonProps } from "@/types/ICommonProps";
import { ButtonLink } from "../UI/CustomLink";
import { LandingNewsItem } from "./LandingNewsItem";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import { newsService } from "@/services/news.service";
import { type INews } from "@/types/INews";

export const NewsSection: FC<ICommonProps> = ({ className }) => {
   const { isMobile } = useMatchMedia();
   const [newsPreview, setNewsPreview] = useState<INews[]>([]);

   const classes = ["news"];
   if (className !== undefined) classes.push(className);

   async function fetchNewsPreview(): Promise<void> {
      const news = await newsService.getNewsList(2);
      setNewsPreview(news);
   }

   useEffect(() => {
      fetchNewsPreview();
   }, []);

   const newsPreviewToShow = isMobile ? [newsPreview[0]] : newsPreview;

   return (
      <div className={classes.join(" ")}>
         <h3 className="news__heading">
            {!isMobile && <br />}
            последние Новости
         </h3>
         <div className="news__row">
            {newsPreviewToShow.map((article) => (
               <LandingNewsItem
                  key={article.id}
                  createdAt={article.createdAt}
                  title={article.title}
                  description={article.description}
                  id={article.id}
               />
            ))}
         </div>
         <ButtonLink to="/news" className="news__btn">
            Все новости
         </ButtonLink>
      </div>
   );
};
