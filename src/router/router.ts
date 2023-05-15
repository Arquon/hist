import { LandingPage } from "@/pages/Landing";
import { Initialize } from "@/pages/Initialize";
import { NewsPage } from "@/pages/News";
import { Freemasonry } from "@/pages/Freemasonry";
import { France } from "@/pages/France";
import { Moscow } from "@/pages/Moscow";
import { FAQ } from "@/pages/FAQ";
import { Introduce } from "@/pages/Introduce";
import { Contacts } from "@/pages/Contacts";
import { Article } from "@/pages/Article";
import { NewsAddPage } from "@/pages/NewsAdd";
import { NewsEdit } from "@/pages/NewsEdit";
import { LoginPage } from "@/pages/Login";
import { withAuth } from "@/hoc/withAuth";
import { withAdmin } from "@/hoc/withAdmin";
import { withoutAuth } from "@/hoc/withoutAuth";

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

   login = "/login",
}

interface IRoute {
   path: ERoutes;
   Element: React.FC;
   name: string;
}

export const routes: IRoute[] = [
   { name: "landing", path: ERoutes.landing, Element: LandingPage },
   { name: "initialize", path: ERoutes.initialize, Element: withAdmin(Initialize) },

   { name: "freemasonry", path: ERoutes.freemasonry, Element: Freemasonry },
   { name: "france", path: ERoutes.france, Element: France },
   { name: "moscow", path: ERoutes.moscow, Element: Moscow },
   { name: "fAQ", path: ERoutes.faq, Element: FAQ },
   { name: "introduce", path: ERoutes.introduce, Element: Introduce },
   { name: "contacts", path: ERoutes.contacts, Element: Contacts },
];

export const newsRoutes: IRoute[] = [
   { name: "newsEdit", path: ERoutes.newsEdit, Element: withAdmin(NewsEdit, "/news") },
   { name: "news", path: ERoutes.news, Element: NewsPage },
   { name: "newsAdd", path: ERoutes.newsAdd, Element: withAdmin(NewsAddPage, "/news") },
   { name: "article", path: ERoutes.article, Element: withAuth(Article) },
];

export const authRoutes: IRoute[] = [{ name: "login", path: ERoutes.login, Element: withoutAuth(LoginPage) }];
