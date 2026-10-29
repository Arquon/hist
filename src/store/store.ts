import { configureStore, createSelector } from "@reduxjs/toolkit";
import newsReducer from "./news/slice";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";

const store = configureStore({
   reducer: {
      newsReducer,
      authReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
   devTools: _NODE_ENV_ !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppSelector = createSelector.withTypes<RootState>();

export type AppActionType<T = void> = (dispatch: AppDispatch, getState: AppGetState) => T;

export default store;
