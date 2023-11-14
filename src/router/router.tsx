import React, { lazy } from "react";

import { LandingPage } from "@/pages/Landing";
import { Initialize } from "@/pages/Initialize";
// import { NewsPage } from "@/pages/News";
import { Freemasonry } from "@/pages/Freemasonry";
import { France } from "@/pages/France";
// import { Moscow } from "@/pages/Moscow";
import { FAQ } from "@/pages/FAQ";
import { Introduce } from "@/pages/Introduce";
import { Contacts } from "@/pages/Contacts";
// import { ArticlePage } from "@/pages/Article";
// import { NewsAddPage } from "@/pages/NewsAdd";
// import { NewsEditPage } from "@/pages/NewsEdit";
import { LoginPageComponent } from "@/pages/Login";
import { Navigate, type RouteObject } from "react-router-dom";
import { MainLayout } from "@/components/layout/main/MainLayout";
import { EmptyLayout } from "@/components/layout/empty/EmptyLayout";
import { withoutAuth } from "@/hoc/withoutAuth";

const NewsPage = lazy(async () => await import("@/pages/News"));
const Moscow = lazy(async () => await import("@/pages/Moscow"));
const ArticlePage = lazy(async () => await import("@/pages/Article"));
const NewsAddPage = lazy(async () => await import("@/pages/NewsAdd"));
const NewsEditPage = lazy(async () => await import("@/pages/NewsEdit"));

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

export const appRoutes: RouteObject[] = [
   {
      element: <MainLayout />,
      children: [
         { path: ERoutes.landing, element: <LandingPage /> },
         { path: ERoutes.initialize, element: <Initialize /> },
         { path: ERoutes.freemasonry, element: <Freemasonry /> },
         { path: ERoutes.france, element: <France /> },
         { path: ERoutes.moscow, element: <Moscow /> },
         { path: ERoutes.faq, element: <FAQ /> },
         { path: ERoutes.introduce, element: <Introduce /> },
         { path: ERoutes.contacts, element: <Contacts /> },
         { path: ERoutes.newsEdit, element: <NewsEditPage /> },
         { path: ERoutes.news, element: <NewsPage /> },
         { path: ERoutes.newsAdd, element: <NewsAddPage /> },
         { path: ERoutes.article, element: <ArticlePage /> },
      ],
   },
   {
      element: <EmptyLayout />,
      children: [{ path: ERoutes.login, Component: withoutAuth(LoginPageComponent) }],
   },
   { path: "*", element: <Navigate to="/" /> },
];
