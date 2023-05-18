import { type INewsWithoutId, type INews } from "@/types/INews";
import httpService from "./http.service";
import { nanoid } from "nanoid";

const newsEndPoint = "news/";

export const newsService = {
   getNewsList: async () => {
      const { data } = await httpService.get<INews[]>(newsEndPoint, {
         params: {
            orderBy: '"createdAt"',
            // equalTo: `${1683281341981}`,
         },
      });
      data.sort((a, b) => b.createdAt - a.createdAt);

      return data;
   },
   getArticle: async (id: string) => {
      const { data } = await httpService.get<INews>(newsEndPoint + id + "/");
      return data;
   },
   createNews: async (payload: INewsWithoutId) => {
      const id = nanoid();
      const { data } = await httpService.put<INews>(newsEndPoint + id + "/", {
         ...payload,
         id,
      });
      return data;
   },
   updateNews: async (payload: INews) => {
      const { data } = await httpService.put<INews>(newsEndPoint + payload.id + "/", payload);
      return data;
   },
   deleteNews: async (id: string) => {
      await httpService.delete(newsEndPoint + id + "/");
   },
};
