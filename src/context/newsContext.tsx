import { newsService } from "@/services/news.service";
import { type ICommonProps } from "@/types/ICommonProps";
import { type INewsFormState, type INews, type INewsWithoutId } from "@/types/INews";
import { type Nullable } from "@/types/default";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import { type NetworkErrors } from "@/hooks/useErrors";

type TArticleRouteParams = Record<"newsId", string>;

interface INewsContext {
   news: INews[];
   isLoadingNews: boolean;
   currentArticle: Nullable<INews>;
   addArticle: (data: INewsFormState) => Promise<INews>;
   updateArticle: (data: INews) => Promise<INews>;
   deleteArticle: (id: string) => Promise<void>;
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
   deleteArticle: async function (id: string): Promise<void> {
      throw new Error("Function not implemented.");
   },
};

const NewsContext = React.createContext<INewsContext>(initialValue);

export const NewsContextProvider: React.FC<ICommonProps> = ({ children }) => {
   const [news, setNews] = useState<INews[]>([]);
   const [error, setError] = useState<Nullable<string>>(null);
   const [isLoading, setIsLoading] = useState(true);

   const { newsId } = useParams<TArticleRouteParams>();

   const errorCatcher = (error: unknown): string => {
      const errorMessage = axios.isAxiosError(error) ? error.message : "Unhandled error";
      setError(errorMessage);
      return errorMessage;
   };

   async function addArticle(newsState: INewsFormState): Promise<INews> {
      try {
         const article: INewsWithoutId = { ...newsState, createdAt: Date.now() };
         const data = await newsService.createNews(article);
         setNews((prevNews) => [data, ...prevNews]);
         return data;
      } catch (error) {
         if (axios.isAxiosError(error)) {
            if (!error.response) throw new Error("Axios Error");
            const { statusText, status: code } = error.response;
            if (code === 401) {
               switch (statusText) {
                  case "Unauthorized":
                     throw new Error("Для добавления новости нужны парава администратора");
                  default:
                     throw new Error("Непредвиденная ошибка");
               }
            }
            throw new Error("Unhandled Axios Error");
         }

         throw new Error("Unhandled Error");
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
         if (axios.isAxiosError(error)) {
            if (!error.response) throw new Error("Axios Error");
            const { statusText, status: code } = error.response;
            if (code === 401) {
               switch (statusText) {
                  case "Unauthorized":
                     throw new Error("Для редактирования новости нужны парава администратора");
                  default:
                     throw new Error("Непредвиденная ошибка");
               }
            }
            throw new Error("Unhandled Axios Error");
         }

         throw new Error("Unhandled Error");
      }
   }

   async function deleteArticle(id: string): Promise<void> {
      try {
         await newsService.deleteNews(id);
         setNews((prevNews) => prevNews.filter((article) => article.id !== id));
      } catch (error) {
         const errorMessage = errorCatcher(error);
         throw errorMessage;
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
         toast(error);
         setError(null);
      }
   }, [error]);

   return (
      <NewsContext.Provider
         value={{ news, isLoadingNews: isLoading, currentArticle, addArticle, updateArticle, deleteArticle }}
      >
         {children}
      </NewsContext.Provider>
   );
};

export function useNews(): INewsContext {
   return useContext(NewsContext);
}
