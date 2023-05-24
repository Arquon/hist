import { newsService } from "@/services/news.service";
import { actions } from "./slice";
import { type AppActionType } from "../store";
import { type INews, type INewsFormState, type INewsWithoutId } from "@/types/INews";
import axios from "axios";

const newsActions = {
   fetchNews: (): AppActionType<Promise<INews[]>> => async (dispatch, getState) => {
      try {
         const data = await newsService.getNewsList();
         dispatch(actions.setNews(data));
         return data;
      } finally {
         dispatch(actions.setLoading(false));
      }
   },
   addArticle:
      (newsState: INewsFormState): AppActionType<Promise<INews>> =>
      async (dispatch, getState) => {
         try {
            const article: INewsWithoutId = { ...newsState, createdAt: Date.now() };
            const data = await newsService.createNews(article);
            const { news } = getState().news;
            dispatch(actions.setNews([...news, data]));
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
      },
   updateArticle:
      (article: INews): AppActionType<Promise<INews>> =>
      async (dispatch, getState) => {
         try {
            const data = await newsService.updateNews(article);
            const { news: prevNews } = getState().news;
            const updatedNews = prevNews.map((prevArticle) => {
               if (prevArticle.id !== article.id) return prevArticle;
               else return data;
            });
            dispatch(actions.setNews(updatedNews));
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
      },
   deleteArticle:
      (id: string): AppActionType<Promise<void>> =>
      async (dispatch, getState) => {
         await newsService.deleteNews(id);
         const { news: prevNews } = getState().news;
         const updatedNews = prevNews.filter((article) => article.id !== id);
         dispatch(actions.setNews(updatedNews));
      },
};

export default newsActions;
