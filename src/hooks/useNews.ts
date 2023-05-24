import newsActions from "@/store/news/actions";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { type INewsFormState, type INews } from "@/types/INews";
import { type Nullable } from "@/types/default";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

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
      if (isLoading) dispatch(newsActions.fetchNews());
   }, []);

   async function addArticle(data: INewsFormState): Promise<INews> {
      const article = await dispatch(newsActions.addArticle(data));
      return article;
   }

   async function updateArticle(article: INews): Promise<INews> {
      const updatedArticle = await dispatch(newsActions.updateArticle(article));
      return updatedArticle;
   }

   async function deleteArticle(id: string): Promise<void> {
      await dispatch(newsActions.deleteArticle(id));
   }

   const currentArticle = useMemo<Nullable<INews>>(() => {
      if (!newsId) return null;
      return news.find((newsItem) => newsItem.id === newsId) ?? null;
   }, [news, newsId]);

   return { news, currentArticle, isLoadingNews: isLoading, addArticle, updateArticle, deleteArticle };
}
