import newsAsyncActions from "@/store/news/actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { type Nullable } from "@/types/common";
import { type NewsItemFormState, type NewsItemView } from "@/types/news";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type TArticleRouteParams = Record<"newsId", string>;

interface UseNews {
   news: NewsItemView[];
   isLoadingNews: boolean;
   currentArticle: Nullable<NewsItemView>;
   addArticle: (data: NewsItemFormState) => Promise<NewsItemView>;
   updateArticle: (data: NewsItemView) => Promise<NewsItemView>;
   deleteArticle: (id: string) => Promise<void>;
}

export function useNews(): UseNews {
   const { news, isLoading } = useAppSelector((state) => state.news);
   const dispatch = useAppDispatch();
   const { newsId } = useParams<TArticleRouteParams>();

   useEffect(() => {
      if (isLoading) fetchNews();
   }, []);

   const errorHandler = (error: unknown): void => {
      if (typeof error === "string") toast(error);
   };

   async function fetchNews(): Promise<void> {
      try {
         unwrapResult(await dispatch(newsAsyncActions.fetchNews()));
      } catch (error) {
         console.log({ error });
         errorHandler(error);
      }
   }

   async function addArticle(data: NewsItemFormState) {
      try {
         const result = await dispatch(newsAsyncActions.addArticle(data));
         return unwrapResult(result);
      } catch (error) {
         errorHandler(error);
         throw "Ошибка при добавлении новости";
      }
   }

   async function updateArticle(article: NewsItemView) {
      try {
         const result = await dispatch(newsAsyncActions.updateArticle(article));
         return unwrapResult(result);
      } catch (error) {
         errorHandler(error);
         throw "Ошибка при обновлении новости";
      }
   }

   async function deleteArticle(id: string): Promise<void> {
      try {
         unwrapResult(await dispatch(newsAsyncActions.deleteArticle(id)));
      } catch (error) {
         errorHandler(error);
         throw "Ошибка при удалении новости";
      }
   }

   const currentArticle = useMemo<Nullable<NewsItemView>>(() => {
      if (!newsId) return null;
      return news.find((newsItem) => newsItem.id === newsId) ?? null;
   }, [news, newsId]);

   return { news, currentArticle, isLoadingNews: isLoading, addArticle, updateArticle, deleteArticle };
}
