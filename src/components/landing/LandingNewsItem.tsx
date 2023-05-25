import { getStringDateFromTimestamp } from "@/utils/functions";
import { type INews } from "@/types/INews";
import React, { type FC } from "react";
import { Link } from "react-router-dom";

interface INewsItemProps extends Omit<INews, "content"> {}

export const LandingNewsItem: FC<INewsItemProps> = ({ createdAt, title, description, id }) => (
   <div className="news__item item-news">
      <h4 className="item-news__title">
         <span className="item-news__date">{getStringDateFromTimestamp(createdAt)}</span>
         {title}
      </h4>
      <p className="item-news__text">{description}</p>
      <Link to={`/news/${id}`} className="item-news__more">
         Подробнее
      </Link>
   </div>
);
