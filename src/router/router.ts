import { Landing } from "@/pages/Landing";
import { Initialize } from "@/pages/Initialize";
import { News } from "@/pages/News";
import { Freemasonry } from "@/pages/Freemasonry";
import { France } from "@/pages/France";
import { Moscow } from "@/pages/Moscow";
import { FAQ } from "@/pages/FAQ";
import { Introduce } from "@/pages/Introduce";
import { Contacts } from "@/pages/Contacts";
import { Article } from "@/pages/Article";
import { NewsAdd } from "@/pages/NewsAdd";
import { NewsEdit } from "@/pages/NewsEdit";

export enum ERoutes {
   landing = "/",
   initialize = "/initialize",

   news = "/news",
   newsAdd = "/news/add",
   newsEdit = "/news/:newsId/edit",
   article = "/news/:newsId",

   freemasonry = "/freemasonry",
   france = "/france",
   moscow = "/moscow",
   faq = "/faq",
   introduce = "/introduce",
   contacts = "/contacts",
}

interface IRoute {
   path: ERoutes;
   Element: React.FC;
   name: string;
}

export const routes: IRoute[] = [
   { name: "landing", path: ERoutes.landing, Element: Landing },
   { name: "initialize", path: ERoutes.initialize, Element: Initialize },

   { name: "freemasonry", path: ERoutes.freemasonry, Element: Freemasonry },
   { name: "france", path: ERoutes.france, Element: France },
   { name: "moscow", path: ERoutes.moscow, Element: Moscow },
   { name: "fAQ", path: ERoutes.faq, Element: FAQ },
   { name: "introduce", path: ERoutes.introduce, Element: Introduce },
   { name: "contacts", path: ERoutes.contacts, Element: Contacts },
];

export const newsRoutes: IRoute[] = [
   { name: "newsEdit", path: ERoutes.newsEdit, Element: NewsEdit },
   { name: "news", path: ERoutes.news, Element: News },
   { name: "newsAdd", path: ERoutes.newsAdd, Element: NewsAdd },
   { name: "article", path: ERoutes.article, Element: Article },
];
