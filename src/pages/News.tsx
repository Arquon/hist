import { AdditionalContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { ButtonLink } from "@/components/UI/CustomLink";
import { Loader } from "@/components/UI/Loader";
import { Pagination } from "@/components/UI/Pagination";
import { NewsItem } from "@/components/news/NewsItem";
import React, { type FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNews } from "@/hooks/useNews";

const newsPerPage = 5;

export const NewsPage: FC = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = searchParams.get("page") !== null ? Number(searchParams.get("page")) : 1;

   const { isAdmin } = useAuth();

   const { news, isLoadingNews } = useNews();

   const changePageHandler = (page: number): void => {
      setSearchParams({ page: String(page) });
   };

   const newsToShow = [...news].splice((currentPage - 1) * newsPerPage, newsPerPage);

   useEffect(() => {
      document.body.scrollIntoView({ behavior: "smooth" });
   }, [newsToShow]);

   return (
      <section className="news-page additional__page">
         <AdditionalContainer className="news-page__container">
            <Heading className="news-page__heading additional__heading">Новости</Heading>
            {isAdmin && (
               <div className="news-page__admin">
                  <ButtonLink to="add">Добавить новость</ButtonLink>
               </div>
            )}

            {isLoadingNews ? (
               <Loader />
            ) : (
               <>
                  <div className="news-page__row">
                     {newsToShow.map((news) => (
                        <NewsItem {...news} key={news.id} />
                     ))}
                  </div>

                  <Pagination
                     className="news-page__pagination"
                     allCount={news.length}
                     currentPage={currentPage}
                     onPageChange={changePageHandler}
                     perPageCount={5}
                  />
               </>
            )}
         </AdditionalContainer>
      </section>
   );
};

export default NewsPage;
