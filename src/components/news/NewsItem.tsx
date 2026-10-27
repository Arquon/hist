import { getStringDateFromTimestamp } from "@/utils/functions";
import React from "react";
import { Link } from "react-router-dom";
import { type NewsItemView } from "@/types/news";

interface Props extends NewsItemView {}

export const NewsItem = ({ createdAt, description, title, id }: Props) => {
   const articlePath = `${id}`;

   return (
      <div className="item-news-page">
         <Link className="item-news-page__title" to={articlePath}>
            <span className="item-news-page__date">{getStringDateFromTimestamp(createdAt)}</span>
            {title}
         </Link>
         <p className="item-news-page__text">{description}</p>
      </div>
   );
};
