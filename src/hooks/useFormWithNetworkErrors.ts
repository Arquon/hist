import { type ObjectType } from "@/types/common";
import { calculateHasError, type TValidator } from "@/utils/validator";
import { useForm } from "./useForm";
import { useNetworkErrors } from "./useNetworkErrors";

interface useFormWithNetworkErrorsQueryParams<T extends ObjectType> {
   initialData: T;
   validatorConfig: Partial<TValidator<T>>;
}

export function useFormWithNetworkErrors<T extends ObjectType>({
   initialData,
   validatorConfig,
}: useFormWithNetworkErrorsQueryParams<T>) {
   const formHookData = useForm({ initialData, validatorConfig });

   const { changeHandler, data, hasError: hasLocalError } = formHookData;

   const networkErrorsHookData = useNetworkErrors<T>(data);

   const { resetPartialNetworkErrors, networkErrors } = networkErrorsHookData;

   const changeHandlerWithResetErrors = (partialData: Partial<T>) => {
      resetPartialNetworkErrors(partialData);
      changeHandler(partialData);
   };

   const hasError = hasLocalError || calculateHasError(networkErrors);

   return { ...formHookData, ...networkErrorsHookData, changeHandler: changeHandlerWithResetErrors, hasError };
}
