import { useState } from "react";
import validator, { type TValidator } from "@/utils/validator";
import { type ValidationErrors } from "@/types/errorsTypes";

interface UseFormParams<T> {
   initialData: T;
   validatorConfig: Partial<TValidator<T>>;
}

interface UseFormReturnType<T> {
   data: T;
   changeHandler: (partialData: Partial<T>) => void;
   errors: ValidationErrors<T>;
   validate: () => boolean;
}

export function useForm<T extends object>({ initialData, validatorConfig }: UseFormParams<T>): UseFormReturnType<T> {
   const [data, setData] = useState(initialData);
   const [errors, setErrors] = useState<ValidationErrors<T>>({});

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
