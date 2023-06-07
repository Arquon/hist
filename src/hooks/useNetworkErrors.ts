import { useEffect, useState } from "react";
import { type ValidationErrors } from "@/types/errorsTypes";

interface UseFormReturnType<T> {
   networkErrors: ValidationErrors<T>;
   networkErrorHandler: (error: unknown) => void;
}

export function useNetworkErrors<T>(data: T): UseFormReturnType<T> {
   const [networkErrors, setNetworkErrors] = useState<ValidationErrors<T>>({});

   const networkErrorHandler = (error: unknown): void => {
      if (typeof error === "object" && error !== null) {
         const loginErrors: ValidationErrors<T> = error;
         setNetworkErrors((prevErrors) => ({
            ...prevErrors,
            ...loginErrors,
         }));
      }
   };

   useEffect(() => {
      setNetworkErrors({});
   }, [data]);

   return { networkErrors, networkErrorHandler };
}
