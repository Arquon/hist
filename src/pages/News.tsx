import { NarrowContainer } from "@/components/UI/Common";
import { Heading } from "@/components/UI/CommonHeadings";
import { CustomButton } from "@/components/UI/CustomButton";
import { Loader } from "@/components/UI/Loader";
import { Pagination } from "@/components/UI/Pagination";
import { type INewsFormState, NewsForm } from "@/components/news/NewsForm";
import { NewsItem } from "@/components/news/NewsItem";
import { EPromiseStatuses, useMockData } from "@/hooks/useMockData";
import { useNews } from "@/hooks/useNews";
import React, { useState, type FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function getStatus(status: EPromiseStatuses): string {
   switch (status) {
      case EPromiseStatuses.idle:
         return "Ожидание загрузки";
      case EPromiseStatuses.pending:
         return "Загрузка";
      case EPromiseStatuses.succeed:
         return "Все файлы загружены";
      case EPromiseStatuses.error:
         return "Ошибка при  загрузке";
   }
}

const newsPerPage = 5;

export const News: FC = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentPage = searchParams.get("page") !== null ? Number(searchParams.get("page")) : 1;

   const { news, isLoadingNews } = useNews();

   // const { count, percentage, status, initializeMockData } = useMockData();
   // const handlerSubmit = (data: INewsFormState): void => {
   //    console.log({ ...data, createdAt: new Date().getTime() });
   // };

   const changePageHandler = (page: number): void => {
      setSearchParams({ page: String(page) });
   };

   useEffect(() => {
      document.body.scrollIntoView({ behavior: "smooth" });
   }, [currentPage]);

   const newsToShow = [...news].splice((currentPage - 1) * newsPerPage, newsPerPage);

   return (
      <section className="news-page">
         <NarrowContainer className="news-page__container">
            <Heading className="news-page__heading">Новости</Heading>
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

            {/* <hr />
            <NewsForm onSubmit={handlerSubmit} />
            <CustomButton onClick={initializeMockData}>Инициализировать новости</CustomButton>
            <ul>
               <li>Текущий статус: {getStatus(status)}</li>
               <li>Процентаж: {percentage}%</li>
               <li>Количество загрженных объектов: {count}</li>
            </ul> */}
         </NarrowContainer>
      </section>
   );
};
