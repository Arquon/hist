import { type INewsWithoutId } from "./INews";

declare module "@/mock/news.json" {
   const News: INewsWithoutId[];
   export = News;
}
