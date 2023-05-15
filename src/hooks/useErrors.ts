import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { type ValidationErrors } from "@/types/errorsTypes";

export type NetworkErrors<T> = ValidationErrors<T> & {
   global?: string;
};

interface UseFormReturnType<T> {
   networkErrors: NetworkErrors<T>;
   networkErrorHandler: (error: unknown) => void;
}

export function useErrors<T>(data: T): UseFormReturnType<T> {
   const [networkErrors, setNetworkErrors] = useState<NetworkErrors<T>>({});

   const networkErrorHandler = (error: unknown): void => {
      if (error instanceof Error) {
         toast(error.message, { autoClose: 5000 });
      } else if (typeof error === "object" && error !== null) {
         const loginErrors: NetworkErrors<T> = error;
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
