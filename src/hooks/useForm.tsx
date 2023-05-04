import { useState } from "react";
import validator, { type TErrors, type TValidator } from "@/functions/validator";

interface UseFormParams<T> {
   initialData: T;
   validatorConfig: TValidator<T>;
}

interface UseFormReturnType<T> {
   data: T;
   changeHandler: (partialData: Partial<T>) => void;
   errors: Partial<TErrors<T>>;
   validate: () => boolean;
}

export function useForm<T extends object>({
   initialData,
   validatorConfig,
}: UseFormParams<T>): UseFormReturnType<T> {
   const [data, setData] = useState(initialData);
   const [errors, setErrors] = useState<Partial<TErrors<T>>>({});

   const changeHandler = (partialData: Partial<T>): void => {
      setData((prevData) => ({
         ...prevData,
         ...partialData,
      }));
   };

   const validate = (): boolean => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length !== 0;
   };

   return { data, changeHandler, errors, validate };
}
