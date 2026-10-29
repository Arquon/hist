import newsAsyncActions from "@/store/news/actions";
import { useAppDispatch } from "@/store/store";
import { type NewsItemFormState, type NewsItemView } from "@/types/news";

export function useNewsActions() {
   const dispatch = useAppDispatch();

   async function addArticle(data: NewsItemFormState) {
      return await dispatch(newsAsyncActions.addArticle(data)).unwrap();
   }

   async function updateArticle(article: NewsItemView) {
      return await dispatch(newsAsyncActions.updateArticle(article)).unwrap();
   }

   async function deleteArticle(id: string) {
      return await dispatch(newsAsyncActions.deleteArticle(id)).unwrap();
   }

   return { addArticle, updateArticle, deleteArticle };
}
