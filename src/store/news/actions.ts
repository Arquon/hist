import { thunkErrorHandler } from "@/services/errors/thunk";
import { newsService } from "@/services/http/news.service";
import { type NewsItemFormState, type NewsItemView, type NewsItemWithoutId } from "@/types/news";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchNews = createAsyncThunk<NewsItemView[], undefined, { rejectValue: unknown }>(
   "news/fetchNews",
   async function (_, { rejectWithValue }) {
      try {
         const data = await newsService.getNewsList();
         return data;
      } catch (error) {
         return rejectWithValue(thunkErrorHandler(error));
      }
   }
);

const addArticle = createAsyncThunk<NewsItemView, NewsItemFormState, { rejectValue: unknown }>(
   "news/addArticle",
   async function (articleState, { rejectWithValue }) {
      try {
         const article: NewsItemWithoutId = { ...articleState, createdAt: Date.now() };
         const data = await newsService.createNews(article);
         return data;
      } catch (error) {
         return rejectWithValue(thunkErrorHandler(error));
      }
   }
);

const updateArticle = createAsyncThunk<NewsItemView, NewsItemView, { rejectValue: unknown }>(
   "news/updateArticle",
   async function (article, { rejectWithValue }) {
      try {
         const data = await newsService.updateNews(article);
         return data;
      } catch (error) {
         return rejectWithValue(thunkErrorHandler(error));
      }
   }
);

const deleteArticle = createAsyncThunk<string, string, { rejectValue: unknown }>(
   "news/deleteArticle",
   async function (id, { rejectWithValue }) {
      try {
         await newsService.deleteNews(id);
         return id;
      } catch (error) {
         return rejectWithValue(thunkErrorHandler(error));
      }
   }
);

const newsAsyncActions = { deleteArticle, addArticle, updateArticle, fetchNews };

export { deleteArticle, addArticle, updateArticle, fetchNews };
export default newsAsyncActions;
