import { type INews } from "@/types/INews";
import React, { type FC } from "react";

interface INewsItemProps extends Omit<INews, "id" | "description"> {}

export const LandingNewsItem: FC<INewsItemProps> = ({ createdAt, title, content }) => (
   <div className="news__item item-news">
      <h4 className="item-news__title">
         <span className="item-news__date">{new Date(createdAt).toLocaleString("ru")}</span>
         {title}
      </h4>
      <p className="item-news__text">{content}</p>
      <a href="#" className="item-news__more">
         Подробнее
      </a>
   </div>
);
