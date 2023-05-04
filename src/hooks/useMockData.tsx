import newsList from "@/mock/news.json";
import { newsService } from "@/services/news.service";
import { useState } from "react";

interface MockDataReturnType {
   initializeMockData: () => Promise<void>;
   count: number;
   status: EPromiseStatuses;
   percentage: number;
}

export enum EPromiseStatuses {
   idle = 0,
   pending = 1,
   succeed = 2,
   error = -1,
}

export function useMockData(): MockDataReturnType {
   const [count, setCount] = useState<number>(0);
   const [status, setStatus] = useState<EPromiseStatuses>(EPromiseStatuses.idle);

   const length = newsList.length;

   const initializeMockData = async (): Promise<void> => {
      const promises: Array<Promise<void>> = [];

      for (const news of newsList) {
         const newPromise = async (): Promise<void> => {
            await newsService.createNews(news);
            setCount((prevCount) => prevCount + 1);
         };
         promises.push(newPromise());
      }

      try {
         await Promise.all(promises);
         setStatus(EPromiseStatuses.succeed);
      } catch (error) {
         setStatus(EPromiseStatuses.error);
         throw error;
      }
   };

   const percentage = Math.trunc((count / length) * 100);

   return { initializeMockData, count, status, percentage };
}
