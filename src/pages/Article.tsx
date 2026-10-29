import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { Loader } from "@/components/UI/Loader";
import { getStringDateFromTimestamp } from "@/utils/functions";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminRequire } from "@/hoc/AdminRequire";
import { useIsAuth } from "@/hooks/auth/useIsAuth";
import { newsNetworkErrorsHandler } from "@/services/errors/default";
import { toast } from "react-toastify";
import { useFetchNews } from "@/hooks/news/useFetchNews";
import { useNewsActions } from "@/hooks/news/useNewsActions";

interface ArticlePageComponentProps {}

const ArticlePageComponent = ({}: ArticlePageComponentProps) => {
   const { newsId } = useParams<{ newsId: string }>();

   const { currentArticle, isLoadingNews } = useFetchNews({ newsId });
   const { deleteArticle } = useNewsActions();

   const navigate = useNavigate();
   const { isAdmin } = useIsAuth();

   const deleteHandler = async (): Promise<void> => {
      if (!currentArticle) return;
      try {
         await deleteArticle(currentArticle.id);
         navigate("/news");
      } catch (error) {
         const parsedError = newsNetworkErrorsHandler(error, {
            _401: {
               unauthorized: "Для удаления новости нужны права администратора",
            },
         });
         toast.error(parsedError);
      }
   };

   return (
      <section className="article-page additional__page">
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

interface ArticlePageProps {}

export const ArticlePage = ({}: ArticlePageProps) => (
   <AdminRequire>
      <ArticlePageComponent />
   </AdminRequire>
);

export default ArticlePage;
