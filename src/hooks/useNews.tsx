import { newsService } from "@/services/news.service";
import { type INews } from "@/types/INews";
import { type Nullable } from "@/types/default";
import { useEffect, useState } from "react";

interface UseNewsReturn {
   news: INews[];
   isLoadingNews: boolean;
}

export function useNews(): UseNewsReturn {
   const [news, setNews] = useState<INews[]>([]);
   const [error, setError] = useState<Nullable<string>>(null);
   const [isLoading, setIsLoading] = useState(true);

   const errorCatcher = (error: unknown): void => {
      if (typeof error === "object" && error !== null && "message" in error) {
         setError(error.message as string);
         return;
      }
      setError("unhandled error");
   };

   async function getNewsList(): Promise<void> {
      try {
         const newsList = await newsService.getNewsList();
         setNews(newsList);
      } catch (error) {
         errorCatcher(error);
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      getNewsList();
   }, []);

   useEffect(() => {
      if (error !== null) {
         console.log(error);
         setError(null);
      }
   }, [error]);

   return { news, isLoadingNews: isLoading };
}
