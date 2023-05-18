import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { Loader } from "@/components/UI/Loader";
import { getStringDateFromTimestamp } from "@/utils/functions";
import { useNews } from "@/context/newsContext";
import React, { type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

interface Props {}

export const Article: FC<Props> = () => {
   const { currentArticle, isLoadingNews, deleteArticle } = useNews();
   const navigate = useNavigate();
   const { isAdmin } = useAuth();

   const deleteHandler = async (): Promise<void> => {
      if (!currentArticle) return;
      try {
         await deleteArticle(currentArticle.id);
         navigate("/news");
      } catch (error) {
         console.log(error);
      }
   };

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
                     {isAdmin && (
                        <>
                           <Link className="article-content__link" to="edit">
                              Редактировать
                           </Link>
                           <span className="article-content__link" onClick={deleteHandler}>
                              Удалить
                           </span>
                        </>
                     )}
                  </p>
                  <p className="article-content__text">{currentArticle.content}</p>
               </article>
            )}
         </NarrowContainer>
      </section>
   );
};
