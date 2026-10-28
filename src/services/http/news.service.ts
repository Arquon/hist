import { type NewsItemWithoutId, type NewsItemView } from "@/types/news";
import httpService from "./http.service";
import { nanoid } from "nanoid";

const newsEndPoint = "news/";

export const newsService = {
   getNewsList: async (limitToLast?: number) => {
      const { data } = await httpService.get<NewsItemView[]>(newsEndPoint, {
         params: {
            orderBy: '"createdAt"',
            limitToLast,
            // equalTo: `${1683281341981}`,
         },
      });
      data.sort((a, b) => b.createdAt - a.createdAt);

      return data;
   },
   getArticle: async (id: string) => {
      const { data } = await httpService.get<NewsItemView>(newsEndPoint + id + "/");
      return data;
   },
   createNews: async (payload: NewsItemWithoutId) => {
      const id: string = nanoid();
      const { data } = await httpService.put<NewsItemView>(newsEndPoint + id + "/", {
         ...payload,
         id,
      });
      return data;
   },
   updateNews: async (payload: NewsItemView) => {
      const { data } = await httpService.put<NewsItemView>(newsEndPoint + payload.id + "/", payload);
      return data;
   },
   deleteNews: async (id: string) => {
      await httpService.delete(newsEndPoint + id + "/");
   },
};
