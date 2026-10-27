import { useState } from "react";
import { getInitialErrors, resetErrorsForFields } from "@/utils/validator";
import { type ValidationErrors, type ObjectType } from "@/types/common";

interface UseFormReturnType<T> {
   networkErrors: ValidationErrors<T>;
   networkErrorHandler: (error: unknown) => void;
   resetPartialNetworkErrors: (partialData: Partial<T>) => void;
}

export function useNetworkErrors<T extends ObjectType>(data: T): UseFormReturnType<T> {
   const [networkErrors, setNetworkErrors] = useState<ValidationErrors<T>>(() => getInitialErrors(data));

   const networkErrorHandler = (error: unknown): void => {
      if (typeof error === "object" && error !== null) {
         const loginErrors: Partial<ValidationErrors<T>> = error;
         setNetworkErrors((prevErrors) => ({
            ...prevErrors,
            ...loginErrors,
         }));
      }
   };

   const resetPartialNetworkErrors = (partialData: Partial<T>) => {
      const partialErrors = resetErrorsForFields(partialData);

      setNetworkErrors((prevErrors) => ({
         ...prevErrors,
         ...partialErrors,
      }));
   };

   return { networkErrors, networkErrorHandler, resetPartialNetworkErrors };
}
