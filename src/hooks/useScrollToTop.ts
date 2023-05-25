import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop(): void {
   const location = useLocation();

   useEffect(() => {
      document.body.scrollIntoView({ behavior: "smooth" });
   }, [location]);
}
