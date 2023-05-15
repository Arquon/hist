import { newsService } from "@/services/news.service";
import { type ICommonProps } from "@/types/ICommonProps";
import { type INewsFormState, type INews, type INewsWithoutId } from "@/types/INews";
import { type Nullable } from "@/types/default";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type TArticleRouteParams = Record<"newsId", string>;

interface INewsContext {
   news: INews[];
   isLoadingNews: boolean;
   currentArticle: Nullable<INews>;
   addArticle: (data: INewsFormState) => Promise<INews>;
   updateArticle: (data: INews) => Promise<INews>;
}

const initialValue: INewsContext = {
   news: [],
   isLoadingNews: true,
   currentArticle: null,
   addArticle: async () => {
      throw new Error("Nan");
   },
   updateArticle: async () => {
      throw new Error("Nan");
   },
};

const NewsContext = React.createContext<INewsContext>(initialValue);

export const NewsContextProvider: React.FC<ICommonProps> = ({ children }) => {
   const [news, setNews] = useState<INews[]>([]);
   const [error, setError] = useState<Nullable<string>>(null);
   const [isLoading, setIsLoading] = useState(true);

   const { newsId } = useParams<TArticleRouteParams>();

   const errorCatcher = (error: unknown): void => {
      if (axios.isAxiosError(error)) {
         setError(error.message);
         return;
      }
      setError("unhandled error");
   };

   async function addArticle(newsState: INewsFormState): Promise<INews> {
      try {
         const article: INewsWithoutId = { ...newsState, createdAt: Date.now() };
         const data = await newsService.createNews(article);
         setNews((prevNews) => [data, ...prevNews]);
         return data;
      } catch (error) {
         errorCatcher(error);
         throw error;
      }
   }

   async function updateArticle(article: INews): Promise<INews> {
      try {
         const data = await newsService.updateNews(article);
         setNews((prevNews) =>
            prevNews.map((prevArticle) => {
               if (prevArticle.id !== article.id) return prevArticle;
               else return data;
            })
         );
         return data;
      } catch (error) {
         errorCatcher(error);
         throw error;
      }
   }

   async function getNewsList(): Promise<void> {
      try {
         const newsList = await newsService.getNewsList();
         setNews(newsList);
      } catch (error) {
         errorCatcher(error);
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      getNewsList();
   }, []);

   const currentArticle: Nullable<INews> = useMemo(() => {
      if (!newsId) return null;
      const article = news.find((newsItem) => newsItem.id === newsId);
      if (!article) return null;
      return article;
   }, [news, newsId]);

   useEffect(() => {
      if (error !== null) {
         console.log(error);
         setError(null);
      }
   }, [error]);

   return (
      <NewsContext.Provider value={{ news, isLoadingNews: isLoading, currentArticle, addArticle, updateArticle }}>
         {children}
      </NewsContext.Provider>
   );
};

export function useNews(): INewsContext {
   return useContext(NewsContext);
}
