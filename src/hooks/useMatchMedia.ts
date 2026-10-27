import { useSyncExternalStore } from "react";

const QUERIES: string[] = [
   "(max-width: 1024px)",
   "(min-width: 1024px) and (max-width: 1440px)",
   "(min-width: 1440px) and (max-width: 1920px)",
   "(min-width: 1920px)",
];

interface UseMatchMediaReturnType {
   isMobile: boolean;
   isTablet: boolean;
   isDesktop: boolean;
   isWideScreen: boolean;
}
const matchMediaQueries = QUERIES.map((query) => matchMedia(query));

const subscribe = (cb: () => void) => {
   matchMediaQueries.forEach((mql) => mql.addEventListener("change", cb));

   return () => {
      matchMediaQueries.forEach((mql) => mql.removeEventListener("change", cb));
   };
};

const getSnapshot = () => {
   return matchMediaQueries.map((mql) => (mql.matches ? "1" : "0")).join("");
};

export function useMatchMedia(): UseMatchMediaReturnType {
   const matches = useSyncExternalStore(subscribe, getSnapshot);

   return {
      isMobile: matches[0] === "1",
      isTablet: matches[1] === "1",
      isDesktop: matches[2] === "1",
      isWideScreen: matches[3] === "1",
   };
}
