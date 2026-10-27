import { type NewsItemWithoutId } from "./news";

declare global {
   declare module "*.css";
   declare module "*.scss";

   declare module "*.png" {
      const value: any;
      export = value;
   }

   declare const _NODE_ENV_: string;

   declare module "@/mock/news.json" {
      const News: NewsItemWithoutId[];
      export = News;
   }
}
