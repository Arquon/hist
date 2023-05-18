import { useLayoutEffect, useState } from "react";

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

export function useMatchMedia(): UseMatchMediaReturnType {
   const matchMediaQueries = QUERIES.map((query) => matchMedia(query));

   const getValues = (): boolean[] => matchMediaQueries.map((mql) => mql.matches);

   const [values, setValues] = useState(getValues);

   useLayoutEffect(() => {
      const handler = (): void => setValues(getValues());

      matchMediaQueries.forEach((mql) => mql.addEventListener("change", handler));

      return () => {
         matchMediaQueries.forEach((mql) => mql.removeEventListener("change", handler));
      };
   }, []);

   return ["isMobile", "isTablet", "isDesktop", "isWideScreen"].reduce(
      (acc, currentValue, index) => ({ ...acc, [currentValue]: values[index] }),
      {
         isMobile: false,
         isTablet: false,
         isDesktop: false,
         isWideScreen: false,
      }
   );
}
