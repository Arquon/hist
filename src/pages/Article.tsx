import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { Loader } from "@/components/UI/Loader";
import { getStringDateFromTimestamp } from "@/functions/utils";
import { useNews } from "@/hooks/useNews";
import React, { type FC } from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Article: FC<Props> = () => {
   const { currentArticle, isLoadingNews } = useNews();

   return (
      <section className="article-page">
         <NarrowContainer className="article-page__container">
            {isLoadingNews || !currentArticle ? (
               <Loader />
            ) : (
               <article className="article-page__content article-content">
                  <Heading className="article-content__title">{currentArticle.title}</Heading>
                  <p className="article-content__date">
                     {getStringDateFromTimestamp(currentArticle.createdAt)}
                     <Link className="article-content__link" to="edit">
                        Редактировать
                     </Link>
                  </p>
                  <p className="article-content__text">{currentArticle.content}</p>
               </article>
            )}
         </NarrowContainer>
      </section>
   );
};
