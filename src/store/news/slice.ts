import { type INews } from "@/types/INews";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
   reducers: {
      setNews(state, action: PayloadAction<INews[]>) {
         state.news = action.payload;
      },
      setLoading(state, action: PayloadAction<boolean>) {
         state.isLoading = action.payload;
      },
   },
});

const { actions, reducer: newsReducer } = newsSlice;

export { actions };
export default newsReducer;
