import { type INews } from "@/types/INews";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchNews, addArticle, updateArticle, deleteArticle } from "./actions";
import { isNewsAsyncThunkError } from "@/utils/isAsyncThunkError";

interface INewsState {
   news: INews[];
   isLoading: boolean;
}

const initialState: INewsState = {
   news: [],
   isLoading: true,
};

const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(fetchNews.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload;
            state.isLoading = false;
         })
         .addCase(addArticle.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(addArticle.fulfilled, (state, action) => {
            state.news.push(action.payload);
            state.isLoading = false;
         })
         .addCase(updateArticle.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateArticle.fulfilled, (state, action) => {
            state.news = state.news.map((article) => {
               if (action.payload.id === article.id) return action.payload;
               return article;
            });
            state.isLoading = false;
         })
         .addCase(deleteArticle.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteArticle.fulfilled, (state, action) => {
            state.news = state.news.filter((article) => article.id !== action.payload);
            state.isLoading = false;
         })

         // .addCase(fetchNews.rejected, (state, action) => {
         //    if (action.payload) state.error = action.payload;
         //    state.isLoading = false;
         // });

         .addMatcher(isNewsAsyncThunkError, (state, action: PayloadAction<string>) => {
            state.isLoading = false;
         });
   },
});

const { reducer: newsReducer } = newsSlice;

export default newsReducer;
