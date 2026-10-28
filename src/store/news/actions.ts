import { newsService } from "@/services/http/news.service";
import { type NewsItemFormState, type NewsItemView, type NewsItemWithoutId } from "@/types/news";
import { newsNetworkErrorsHandler } from "@/utils/errorHandlers";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchNews = createAsyncThunk<NewsItemView[], undefined, { rejectValue: string }>(
   "news/fetchNews",
   async function (_, { rejectWithValue }) {
      try {
         const data = await newsService.getNewsList();
         return data;
      } catch (error) {
         const stringError = newsNetworkErrorsHandler(error);
         return rejectWithValue(stringError);
      }
   }
);

const addArticle = createAsyncThunk<NewsItemView, NewsItemFormState, { rejectValue: string }>(
   "news/addArticle",
   async function (articleState, { rejectWithValue }) {
      try {
         const article: NewsItemWithoutId = { ...articleState, createdAt: Date.now() };
         const data = await newsService.createNews(article);
         return data;
      } catch (error) {
         const stringError = newsNetworkErrorsHandler(error, {
            _401: {
               unauthorized: "Для добавления новости нужны парава администратора",
            },
         });
         return rejectWithValue(stringError);
      }
   }
);

const updateArticle = createAsyncThunk<NewsItemView, NewsItemView, { rejectValue: string }>(
   "news/updateArticle",
   async function (article, { rejectWithValue }) {
      try {
         const data = await newsService.updateNews(article);
         return data;
      } catch (error) {
         const stringError = newsNetworkErrorsHandler(error, {
            _401: {
               unauthorized: "Для обновления новости нужны парава администратора",
            },
         });
         return rejectWithValue(stringError);
      }
   }
);

const deleteArticle = createAsyncThunk<string, string, { rejectValue: string }>(
   "news/deleteArticle",
   async function (id, { rejectWithValue }) {
      try {
         await newsService.deleteNews(id);
         return id;
      } catch (error) {
         const stringError = newsNetworkErrorsHandler(error, {
            _401: {
               unauthorized: "Для удаления новости нужны парава администратора",
            },
         });
         return rejectWithValue(stringError);
      }
   }
);

const newsAsyncActions = { deleteArticle, addArticle, updateArticle, fetchNews };

export { deleteArticle, addArticle, updateArticle, fetchNews };
export default newsAsyncActions;
