import { getStringDateFromTimestamp } from "@/utils/functions";
import { type INews } from "@/types/INews";
import React, { type FC } from "react";
import { Link } from "react-router-dom";

interface Props extends INews {}

export const NewsItem: FC<Props> = ({ createdAt, description, title, id }) => {
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
