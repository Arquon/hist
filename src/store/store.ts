import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newsReducer from "./news/slice";
import logger from "redux-logger";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";

const rootReducer = combineReducers({
   news: newsReducer,
   auth: authReducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware();
      if (process.env.NODE_ENV !== "production") middleware.concat(logger);
      return middleware;
   },
   devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppActionType<T = void> = (dispatch: AppDispatch, getState: AppGetState) => T;

export default store;
