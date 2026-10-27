import { getStringDateFromTimestamp } from "@/utils/functions";
import React from "react";
import { Link } from "react-router-dom";
import { type NewsItemView } from "@/types/news";

interface NewsItemProps extends Omit<NewsItemView, "content"> {}

export const LandingNewsItem = ({ createdAt, title, description, id }: NewsItemProps) => (
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
