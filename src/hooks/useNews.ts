import newsAsyncActions from "@/store/news/actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { type INewsFormState, type INews } from "@/types/INews";
import { type Nullable } from "@/types/default";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type TArticleRouteParams = Record<"newsId", string>;

interface UseNews {
   news: INews[];
   isLoadingNews: boolean;
   currentArticle: Nullable<INews>;
   addArticle: (data: INewsFormState) => Promise<INews>;
   updateArticle: (data: INews) => Promise<INews>;
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

   async function addArticle(data: INewsFormState): Promise<INews> {
      try {
         const result = await dispatch(newsAsyncActions.addArticle(data));
         return unwrapResult(result);
      } catch (error) {
         errorHandler(error);
         throw "Ошибка при добавлении новости";
      }
   }

   async function updateArticle(article: INews): Promise<INews> {
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

   const currentArticle = useMemo<Nullable<INews>>(() => {
      if (!newsId) return null;
      return news.find((newsItem) => newsItem.id === newsId) ?? null;
   }, [news, newsId]);

   return { news, currentArticle, isLoadingNews: isLoading, addArticle, updateArticle, deleteArticle };
}
