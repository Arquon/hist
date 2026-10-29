import { createAppSelector } from "../store";

const currentArticle = createAppSelector(
   [(state) => state.newsReducer.news, (state, newsId: string | undefined) => newsId],
   (news, newsId) => {
      if (!newsId) return null;
      return news.find((newsItem) => newsItem.id === newsId) ?? null;
   }
);

export const newsSelectors = {
   currentArticle,
};
