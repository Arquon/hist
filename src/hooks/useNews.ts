import newsAsyncActions from "@/store/news/actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { type Nullable } from "@/types/common";
import { type NewsItemFormState, type NewsItemView } from "@/types/news";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

type TArticleRouteParams = Record<"newsId", string>;

interface UseNews {
   news: NewsItemView[];
   isLoadingNews: boolean;
   currentArticle: Nullable<NewsItemView>;
   addArticle: (data: NewsItemFormState) => Promise<NewsItemView>;
   updateArticle: (data: NewsItemView) => Promise<NewsItemView>;
   deleteArticle: (id: string) => Promise<string>;
}

export function useNews(): UseNews {
   const { news, isLoading } = useAppSelector((state) => state.news);
   const dispatch = useAppDispatch();
   const { newsId } = useParams<TArticleRouteParams>();

   const fetchNews = useCallback(async () => {
      unwrapResult(await dispatch(newsAsyncActions.fetchNews()));
   }, [dispatch]);

   async function addArticle(data: NewsItemFormState) {
      const result = await dispatch(newsAsyncActions.addArticle(data));
      return unwrapResult(result);
   }

   async function updateArticle(article: NewsItemView) {
      const result = await dispatch(newsAsyncActions.updateArticle(article));
      return unwrapResult(result);
   }

   async function deleteArticle(id: string) {
      const result = await dispatch(newsAsyncActions.deleteArticle(id));
      return unwrapResult(result);
   }

   const currentArticle = useMemo<Nullable<NewsItemView>>(() => {
      if (!newsId) return null;
      return news.find((newsItem) => newsItem.id === newsId) ?? null;
   }, [news, newsId]);

   useEffect(() => {
      if (isLoading) fetchNews();
   }, [isLoading, fetchNews]);

   return { news, currentArticle, isLoadingNews: isLoading, addArticle, updateArticle, deleteArticle };
}
