import React, { type FC } from "react";
import { useParams } from "react-router-dom";

interface Props {}

export const Article: FC<Props> = () => {
   const { newsId } = useParams();
   return <div>Article {newsId}</div>;
};
