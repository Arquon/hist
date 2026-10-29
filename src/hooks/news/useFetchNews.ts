import newsAsyncActions from "@/store/news/actions";
import { newsSelectors } from "@/store/news/selectors";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useCallback, useEffect } from "react";

interface UseFetchNewsQueryParams {
   newsId: string | undefined;
}

export function useFetchNews({ newsId }: UseFetchNewsQueryParams) {
   const { news, isLoading } = useAppSelector((state) => state.newsReducer);
   const dispatch = useAppDispatch();

   const currentArticle = useAppSelector((state) => newsSelectors.currentArticle(state, newsId));

   const fetchNews = useCallback(() => {
      dispatch(newsAsyncActions.fetchNews()).unwrap();
   }, [dispatch]);

   useEffect(() => {
      if (isLoading) fetchNews();
   }, [isLoading, fetchNews]);

   return { news, currentArticle, isLoadingNews: isLoading };
}
