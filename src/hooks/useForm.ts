import { useState } from "react";
import validator, {
   calculateHasError,
   getInitialErrors,
   resetErrorsForFields,
   type TValidator,
} from "@/utils/validator";
import { type ValidationErrors, type ObjectType } from "@/types/common";

interface UseFormParams<T> {
   initialData: T;
   validatorConfig: Partial<TValidator<T>>;
}

interface UseFormReturnType<T> {
   data: T;
   changeHandler: (partialData: Partial<T>) => void;
   errors: ValidationErrors<T>;
   hasError: boolean;
   validateFields: (partialData: Partial<T>) => void;
   validateForm: () => boolean;
}

export function useForm<T extends ObjectType>({
   initialData,
   validatorConfig,
}: UseFormParams<T>): UseFormReturnType<T> {
   const [data, setData] = useState(initialData);
   const [errors, setErrors] = useState<ValidationErrors<T>>(() => getInitialErrors(data));

   const changeHandler = (partialData: Partial<T>) => {
      const newData = {
         ...data,
         ...partialData,
      };

      const resetedErrors = resetErrorsForFields(partialData);
      setErrors((prevErrors) => ({ ...prevErrors, ...resetedErrors }));
      setData(newData);
   };

   const validateForm = () => {
      const errors = validator(data, validatorConfig);
      setErrors((prevErrors) => ({
         ...prevErrors,
         ...errors,
      }));

      return calculateHasError(errors);
   };

   const validateFields = (partialFormData: Partial<T>) => {
      const partialErrors = validator(partialFormData, validatorConfig);

      setErrors((prevErrors) => ({
         ...prevErrors,
         ...partialErrors,
      }));
   };

   const hasError = calculateHasError(errors);

   return { data, changeHandler, validateFields, validateForm, errors, hasError };
}
