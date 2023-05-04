import { type INews } from "@/types/INews";
import React, { type FC } from "react";

interface Props extends INews {}

export const NewsItem: FC<Props> = ({ createdAt, content, title }) => {
   return (
      <div className="item-news-page">
         <p className="item-news-page__title">
            <span className="item-news-page__date">{new Date(createdAt).toLocaleString("ru")}</span>
            {title}
         </p>
         <p className="item-news-page__text">{content}</p>
      </div>
   );
};
